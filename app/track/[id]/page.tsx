import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TrackDetailClient } from "@/components/track-detail-client";
import type { TrackInfo } from "@/app/api/spotify/route";
import type { YouTubeSearchResult } from "@/app/api/youtube/route";

async function getTrackData(id: string): Promise<TrackInfo | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/spotify?type=track&id=${id}`, { cache: 'no-store' });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    return null;
  }
}

async function getYouTubeResults(track: TrackInfo): Promise<YouTubeSearchResult[]> {
  if (!track) return [];
  try {
    const query = `${track.artist} - ${track.title}`;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/youtube?query=${encodeURIComponent(query)}`, { cache: 'no-store' });
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    return [];
  }
}

export default async function TrackPage({ params }: { params: { id: string } }) {
  const trackId = params.id;
  const track = await getTrackData(trackId);
  const searchResults = track ? await getYouTubeResults(track) : [];

  if (!track) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center">
        <div className="container max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Track Not Found</h1>
          <p className="text-gray-600 mb-6">Could not load data for the requested track ({trackId}).</p>
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <TrackDetailClient track={track} initialSearchResults={searchResults} />
      </div>
    </div>
  );
}