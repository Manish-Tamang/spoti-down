import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PlaylistDetailClient } from "@/components/playlist-detail-client";
import type { PlaylistInfo } from "@/app/api/spotify/route";

async function getPlaylistData(id: string): Promise<PlaylistInfo | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/spotify?type=playlist&id=${id}`, { cache: 'no-store' });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch playlist data (Status: ${res.status})`);
    }
    return await res.json();
  } catch (error) {
    return null;
  }
}

export default async function PlaylistPage({ params }: { params: { id: string } }) {
  const playlistId = params.id;
  const playlist = await getPlaylistData(playlistId);

  if (!playlist) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center">
        <div className="container max-w-5xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Playlist Not Found</h1>
          <p className="text-gray-600 mb-6">Could not load data for the requested playlist ({playlistId}). It might be private or does not exist.</p>
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
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <PlaylistDetailClient playlist={playlist} />
      </div>
    </div>
  );
}