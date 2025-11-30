import { NextRequest, NextResponse } from "next/server";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
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

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("videoId");
  const title = searchParams.get("title");
  const artist = searchParams.get("artist");
  const album = searchParams.get("album");
  const imageUrl = searchParams.get("imageUrl");
  const filename = searchParams.get("filename") || "track.mp3";
  const rapidApiKey = process.env.RAPIDAPI_KEY;

  if (!videoId) {
    return NextResponse.json(
      { error: "Missing 'videoId' parameter" },
      { status: 400 }
    );
  }

  if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    return NextResponse.json(
      { error: "Invalid 'videoId' format" },
      { status: 400 }
    );
  }

  if (!rapidApiKey) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const apiUrl = `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`;
  const headers = {
    "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
    "x-rapidapi-key": rapidApiKey,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    if (!response.ok) {
      const errorBodyText = await response
        .text()
        .catch(() => "Failed to communicate with download service.");
      return NextResponse.json(
        { error: `Download service error (Status: ${response.status})` },
        { status: 502 }
      );
    }

    const data: RapidApiResponse = await response.json();

    if ("link" in data && data.status === "ok") {
      if (!data.link || typeof data.link !== "string") {
        return NextResponse.json(
          { error: "Invalid download link received from service" },
          { status: 502 }
        );
      }

      const tempDir = path.join(os.tmpdir(), `spotify-downloader-${Date.now()}`);
      const mp3Path = path.join(tempDir, filename);
      let tempDirCreated = false;

      try {
        await fs.mkdir(tempDir, { recursive: true });
        tempDirCreated = true;

        console.log("Downloading MP3 from:", data.link);
        const mp3Response = await fetch(data.link, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Referer": "https://www.youtube.com/",
          },
        });
        
        if (!mp3Response.ok) {
          const errorText = await mp3Response.text().catch(() => "");
          console.error(`MP3 download failed: ${mp3Response.status}`, errorText.substring(0, 200));
          
          if (mp3Response.status === 404) {
            return NextResponse.json(
              { 
                error: "The download link is invalid or expired. The video may not be available. Please try again.",
                status: 404
              },
              { status: 404 }
            );
          }
          
          throw new Error(`MP3 download failed: ${mp3Response.status}. The download link may be invalid or expired.`);
        }

        const fileStream = createWriteStream(mp3Path);
        await pipeline(mp3Response.body as any, fileStream);

        const fileStats = await fs.stat(mp3Path);
        if (fileStats.size === 0) {
          throw new Error("Downloaded file is empty");
        }

        if (title && artist) {
          try {
            const metadataResult = await editMP3Metadata(mp3Path, {
              title: decodeURIComponent(title),
              artist: decodeURIComponent(artist),
              album: album ? decodeURIComponent(album) : "",
              imageUrl: imageUrl ? decodeURIComponent(imageUrl) : null,
            });
            if (!metadataResult) {
              console.warn("Failed to edit metadata, continuing with original file");
            }
          } catch (metadataError) {
            console.warn("Metadata editing failed, continuing with original file:", metadataError);
          }
        }

        const mp3Buffer = await fs.readFile(mp3Path);

        await fs.unlink(mp3Path).catch(() => {});
        await fs.rmdir(tempDir).catch(() => {});

        return new NextResponse(new Uint8Array(mp3Buffer), {
          headers: {
            "Content-Type": "audio/mpeg",
            "Content-Disposition": `attachment; filename="${filename}"`,
          },
        });
      } catch (error) {
        try {
          if (tempDirCreated) {
            await fs.unlink(mp3Path).catch(() => {});
            await fs.rmdir(tempDir).catch(() => {});
          }
        } catch (cleanupError) {
          console.error("Cleanup error:", cleanupError);
        }

        const errorMessage = error instanceof Error ? error.message : "Failed to process MP3";
        console.error("Error processing MP3:", errorMessage, error);
        return NextResponse.json(
          { error: errorMessage },
          { status: 500 }
        );
      }
    } else if (
      "msg" in data &&
      (data.status === "fail" || data.status === "processing")
    ) {
      const userMessage =
        data.status === "processing"
          ? "Audio is still processing, please try again shortly."
          : `Download service reported an error: ${
              data.msg || "Unknown error"
            }`;
      return NextResponse.json(
        { error: userMessage, serviceStatus: data.status },
        { status: data.status === "processing" ? 202 : 400 }
      );
    } else {
      return NextResponse.json(
        { error: "Unexpected response from download service." },
        { status: 500 }
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to initiate download";
    console.error("Download route error:", errorMessage, error);
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? (error instanceof Error ? error.stack : String(error)) : undefined
      }, 
      { status: 500 }
    );
  }
}
