"use client";

import {
  PlaylistHeader,
  type PlaylistInfo as PlaylistHeaderInfo,
} from "@/components/playlist-header";
import { TrackCard } from "@/components/track-card";
import type { PlaylistInfo as FullPlaylistInfo } from "@/app/api/spotify/route";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";

interface PlaylistDetailClientProps {
  playlist: FullPlaylistInfo;
}

export function PlaylistDetailClient({ playlist }: PlaylistDetailClientProps) {
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  const headerInfo: PlaylistHeaderInfo = {
    id: playlist.id,
    title: playlist.title,
    description: playlist.description,
    owner: playlist.ownerName,
    trackCount: playlist.trackCount,
    followers: playlist.followers,
    imageUrl: playlist.imageUrl || "/placeholder.svg",
  };

  const handleDownloadAll = async () => {
    alert(
      "Download All functionality is complex and not fully implemented in this example.\nIt would typically involve:\n1. Fetching all YouTube links.\n2. Downloading each track individually (perhaps in sequence or parallel with limits).\n3. Potentially zipping the files on the client or server-side."
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <PlaylistHeader playlist={headerInfo}>
          <div className="mt-6">
            <Button
              variant="outline"
              onClick={handleDownloadAll}
              disabled={isDownloadingAll || playlist.tracks.length === 0}
            >
              {isDownloadingAll ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              {isDownloadingAll
                ? `Downloading (${playlist.tracks.length} tracks)...`
                : "Download All"}
            </Button>
          </div>
        </PlaylistHeader>

        <div className="mt-8">
          <div className="border-b border-gray-200 pb-2 mb-4">
            <div className="flex items-center gap-3 px-3 text-sm text-gray-600">
              <div className="w-6 text-center">#</div>
              <div className="w-[56px] flex-shrink-0"></div>
              <div className="flex-1 min-w-0">Title / Artist</div>
              <div className="w-16 text-right">Duration</div>
              <div className="w-10 flex-shrink-0"></div>
            </div>
          </div>

          <div className="space-y-1">
            {playlist.tracks.map((track, index) => (
              <TrackCard
                key={`${track.id}-${index}`}
                track={{
                  id: track.id,
                  title: track.title,
                  artist: track.artist,
                  album: track.album,
                  duration: track.duration,
                  imageUrl: track.imageUrl || "/placeholder.svg",
                }}
                index={index + 1}
                showIndex={true}
              />
            ))}
            {playlist.tracks.length === 0 && (
              <p className="text-gray-600 text-center py-4">
                This playlist appears to be empty.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
