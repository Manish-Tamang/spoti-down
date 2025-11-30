"use client";

import {
  PlaylistHeader,
  type PlaylistInfo as PlaylistHeaderInfo,
} from "@/components/playlist-header";
import { TrackCard } from "@/components/track-card";
import type { PlaylistInfo as FullPlaylistInfo } from "@/app/api/spotify/route";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, ExternalLink } from "lucide-react";
import { useState } from "react";
import { GitHub } from "./icons/Github";

interface PlaylistDetailClientProps {
  playlist: FullPlaylistInfo;
}

export function PlaylistDetailClient({ playlist }: PlaylistDetailClientProps) {
  const [showApologyModal, setShowApologyModal] = useState(false);

  const headerInfo = {
    id: playlist.id,
    name: playlist.name,
    title: playlist.name,
    description: playlist.description,
    owner: playlist.ownerName,
    trackCount: playlist.trackCount,
    followers: playlist.followers,
    imageUrl: playlist.imageUrl,
    spotifyUrl: playlist.spotifyUrl,
  };

  const handleDownloadAll = () => {
    if (!playlist) return;
    setShowApologyModal(true);
  };

  return (
    <>
      <div className="min-h-screen bg-white text-gray-900">
        <div className="max-w-[670px] mx-auto px-4 py-8">
          <PlaylistHeader playlist={headerInfo}>
            <div className="mt-6">
              <Button
                variant="outline"
                onClick={handleDownloadAll}
                disabled={playlist.tracks.length === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Download All
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

      <Dialog open={showApologyModal} onOpenChange={setShowApologyModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Sorry! 😔</DialogTitle>
            <DialogDescription className="text-base pt-2">
              I haven't made this feature yet. The "Download All" functionality is still under development.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700 mb-4">
              If you're a developer and would like to help, you can contribute to this feature by visiting the GitHub repository.
            </p>
            <a
              href="https://github.com/Manish-Tamang/spoti-down"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-spotify-green hover:text-spotify-green/80 font-medium transition-colors"
            >
              <GitHub className="h-5 w-5" />
              <span>View on GitHub</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowApologyModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
