import { NextResponse } from "next/server";
import { getSpotifyAccessToken } from "@/lib/spotify";
import { PlaylistInfo } from "@/lib/types";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import archiver from "archiver";
import path from "path";
import os from "os";
import fs from "fs/promises";
import { editMP3Metadata } from "@/lib/mp3-metadata";

interface RapidApiResponseSuccess {
  link: string;
  title: string;
  status: "ok";
  progress?: number;
}

interface RapidApiResponseError {
  status: "fail" | "processing" | string;
  msg: string;
}

type RapidApiResponse = RapidApiResponseSuccess | RapidApiResponseError;

async function downloadTrack(videoId: string, trackName: string, tempDir: string): Promise<string | null> {
  try {
    const rapidApiKey = process.env.RAPIDAPI_KEY;
    console.log("RAPIDAPI_KEY:", rapidApiKey ? "Present" : "Missing");
    
    if (!rapidApiKey) {
      console.error("RAPIDAPI_KEY is not set in environment variables");
      throw new Error("Server configuration error: RAPIDAPI_KEY is missing");
    }

    const downloadUrl = `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`;
    console.log(`Downloading from: ${downloadUrl}`);

    const downloadResponse = await fetch(downloadUrl, {
      headers: {
        "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
        "x-rapidapi-key": rapidApiKey,
      },
    });

    console.log(`Download response status: ${downloadResponse.status}`);
    const downloadText = await downloadResponse.text();
    console.log(`Download response: ${downloadText}`);

    if (!downloadResponse.ok) {
      console.error(`Download request failed: ${downloadResponse.status}`, downloadText);
      return null;
    }

    let data: RapidApiResponse;
    try {
      data = JSON.parse(downloadText);
    } catch (e) {
      console.error("Failed to parse download response:", e);
      return null;
    }

    console.log(`Download response data: ${JSON.stringify(data)}`);
    
    if ("link" in data && data.status === "ok") {
      console.log(`Downloading MP3 from: ${data.link}`);
      const mp3Response = await fetch(data.link);
      console.log(`MP3 download status: ${mp3Response.status}`);

      if (!mp3Response.ok) {
        const errorText = await mp3Response.text();
        console.error(`MP3 download failed: ${mp3Response.status}`, errorText);
        return null;
      }

      const mp3Path = path.join(tempDir, `${trackName}.mp3`);
      console.log(`Saving to: ${mp3Path}`);
      
      const fileStream = createWriteStream(mp3Path);
      await pipeline(mp3Response.body as any, fileStream);
      
      // Verify the file was created
      const stats = await fs.stat(mp3Path);
      if (stats.size === 0) {
        console.error(`File was created but is empty: ${mp3Path}`);
        await fs.unlink(mp3Path);
        return null;
      }
      
      console.log(`Successfully downloaded: ${mp3Path}`);
      return mp3Path;
    }

    console.error(`Invalid response format or status: ${JSON.stringify(data)}`);
    return null;
  } catch (error) {
    console.error(`Error downloading track ${trackName}:`, error);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Request body:", body);
    
    const { playlistId } = body;
    if (!playlistId) {
      console.error("No playlistId provided in request");
      return NextResponse.json(
        { error: "Playlist ID is required" },
        { status: 400 }
      );
    }

    console.log(`Processing playlist: ${playlistId}`);
    
    // Get Spotify access token
    const accessToken = await getSpotifyAccessToken();
    if (!accessToken) {
      console.error("Failed to get Spotify access token");
      return NextResponse.json(
        { error: "Failed to get Spotify access token. Please check your Spotify credentials." },
        { status: 500 }
      );
    }

    // Fetch playlist data
    const playlistResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!playlistResponse.ok) {
      const errorText = await playlistResponse.text();
      console.error("Failed to fetch playlist:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch playlist from Spotify" },
        { status: playlistResponse.status }
      );
    }

    const playlistData = await playlistResponse.json();
    console.log(`Found playlist: ${playlistData.name} with ${playlistData.tracks.items.length} tracks`);
    
    // Create a temporary directory for the tracks
    const tempDir = path.join(os.tmpdir(), `spotify-downloader-${playlistId}`);
    await fs.mkdir(tempDir, { recursive: true });
    console.log(`Created temp directory: ${tempDir}`);

    const tracks = playlistData.tracks.items.map((item: any) => ({
      title: item.track.name,
      artist: item.track.artists.map((a: any) => a.name).join(", "),
      album: item.track.album.name,
      duration: item.track.duration_ms,
      videoId: item.track.external_ids?.youtube || null,
      imageUrl: item.track.album.images?.[0]?.url || null,
    }));

    // Create a zip file
    const zipPath = path.join(tempDir, "playlist.zip");
    const output = createWriteStream(zipPath);
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    archive.pipe(output);

    // Download each track
    const downloadedTracks: string[] = [];
    let successCount = 0;
    
    for (const track of tracks) {
      try {
        console.log(`Processing track: ${track.title}`);
        if (!track.videoId) {
          console.error(`No YouTube ID found for track: ${track.title}`);
          continue;
        }
        const mp3Path = await downloadTrack(track.videoId, track.title, tempDir);
        if (mp3Path) {
          // Edit metadata with Spotify track information
          const metadataEdited = await editMP3Metadata(mp3Path, {
            title: track.title,
            artist: track.artist,
            album: track.album,
            imageUrl: track.imageUrl,
          });
          
          if (metadataEdited) {
            console.log(`Metadata edited for: ${track.title}`);
          } else {
            console.warn(`Failed to edit metadata for: ${track.title}, continuing anyway`);
          }

          downloadedTracks.push(mp3Path);
          archive.file(mp3Path, { name: `${track.title}.mp3` });
          successCount++;
          console.log(`Added to ZIP: ${track.title}`);
        } else {
          console.error(`Failed to download: ${track.title}`);
        }
      } catch (error) {
        console.error(`Error processing track ${track.title}:`, error);
      }
    }

    console.log(`Successfully downloaded ${successCount} out of ${tracks.length} tracks`);
    
    if (successCount === 0) {
      return NextResponse.json(
        { error: "Failed to download any tracks. Please check your RAPIDAPI_KEY and try again." },
        { status: 500 }
      );
    }

    await archive.finalize();
    console.log(`Created ZIP file: ${zipPath}`);

    // Clean up downloaded MP3 files
    for (const trackPath of downloadedTracks) {
      try {
        await fs.unlink(trackPath);
      } catch (error) {
        console.error(`Failed to delete track: ${trackPath}`, error);
      }
    }

    // Read the zip file into a buffer
    const zipBuffer = await fs.readFile(zipPath);
    
    // Clean up the zip file
    await fs.unlink(zipPath);
    await fs.rmdir(tempDir);

    // Return the zip file
    return new NextResponse(zipBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${playlistData.name}.zip"`,
      },
    });
  } catch (error) {
    console.error("Error downloading playlist:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to download playlist" },
      { status: 500 }
    );
  }
} 