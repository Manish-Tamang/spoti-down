import { NextRequest, NextResponse } from "next/server";
import { fetchWrapper, parseYouTubeDuration } from "@/lib/utils";
import {
  YouTubeSearchResponse,
  YouTubeVideosResponse,
  YouTubeSearchResult,
} from "@/lib/types";

const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!query) {
    return NextResponse.json(
      { error: "Missing 'query' parameter" },
      { status: 400 }
    );
  }

  if (!apiKey) {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    const searchUrl = new URL(`${YOUTUBE_API_BASE_URL}/search`);
    searchUrl.searchParams.set("part", "snippet");
    searchUrl.searchParams.set("q", query);
    searchUrl.searchParams.set("type", "video");
    searchUrl.searchParams.set("maxResults", "3");
    searchUrl.searchParams.set("key", apiKey);

    const searchResponse = await fetchWrapper<YouTubeSearchResponse>(
      searchUrl.toString()
    );

    if (!searchResponse.items || searchResponse.items.length === 0) {
      return NextResponse.json({ results: [] });
    }

    const videoIds = searchResponse.items
      .map((item) => item.id.videoId)
      .join(",");

    const videosUrl = new URL(`${YOUTUBE_API_BASE_URL}/videos`);
    videosUrl.searchParams.set("part", "contentDetails");
    videosUrl.searchParams.set("id", videoIds);
    videosUrl.searchParams.set("key", apiKey);

    const videosResponse = await fetchWrapper<YouTubeVideosResponse>(
      videosUrl.toString()
    );

    const durationMap = new Map<string, string>();
    videosResponse.items.forEach((item) => {
      durationMap.set(
        item.id,
        parseYouTubeDuration(item.contentDetails.duration)
      );
    });

    const results: YouTubeSearchResult[] = searchResponse.items.map((item) => {
      const bestThumbnail =
        item.snippet.thumbnails.medium || item.snippet.thumbnails.default;
      return {
        videoId: item.id.videoId,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        thumbnailUrl: bestThumbnail?.url || null,
        duration: durationMap.get(item.id.videoId) || "N/A",
      };
    });

    return NextResponse.json({ results });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to search YouTube";
    if (error instanceof Error && error.message.includes("quotaExceeded")) {
      return NextResponse.json(
        { error: "YouTube API quota exceeded. Please try again later." },
        { status: 429 }
      );
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
export type { YouTubeSearchResult };

