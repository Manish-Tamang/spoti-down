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
      // Download the MP3 file to a temporary location
      const tempDir = path.join(os.tmpdir(), `spotify-downloader-${Date.now()}`);
      await fs.mkdir(tempDir, { recursive: true });
      const mp3Path = path.join(tempDir, filename);

      try {
        // Download MP3 from the link
        const mp3Response = await fetch(data.link);
        if (!mp3Response.ok) {
          throw new Error(`Failed to download MP3: ${mp3Response.status}`);
        }

        // Save to temp file
        const fileStream = createWriteStream(mp3Path);
        await pipeline(mp3Response.body as any, fileStream);

        // Edit metadata if track info is provided
        if (title && artist) {
          await editMP3Metadata(mp3Path, {
            title: decodeURIComponent(title),
            artist: decodeURIComponent(artist),
            album: album ? decodeURIComponent(album) : "",
            imageUrl: imageUrl ? decodeURIComponent(imageUrl) : null,
          });
        }

        // Read the file and return it
        const mp3Buffer = await fs.readFile(mp3Path);

        // Clean up temp file
        await fs.unlink(mp3Path);
        await fs.rmdir(tempDir);

        // Return the MP3 file
        return new NextResponse(Buffer.from(mp3Buffer as any), {
          headers: {
            "Content-Type": "audio/mpeg",
            "Content-Disposition": `attachment; filename="${filename}"`,
          },
        });
      } catch (error) {
        // Clean up on error
        try {
          await fs.unlink(mp3Path).catch(() => {});
          await fs.rmdir(tempDir).catch(() => {});
        } catch {}

        console.error("Error processing MP3:", error);
        return NextResponse.json(
          { error: error instanceof Error ? error.message : "Failed to process MP3" },
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
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
