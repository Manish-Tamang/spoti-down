import { NextRequest, NextResponse } from "next/server";

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
      return NextResponse.redirect(data.link, 302);
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
