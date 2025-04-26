import Image from "next/image";
import type React from 'react';

export interface PlaylistInfo {
  id: string;
  title: string;
  description: string | null;
  owner: string;
  trackCount: number;
  followers: number;
  imageUrl: string | null;
  spotifyUrl?: string;
}

interface PlaylistHeaderProps {
  playlist: PlaylistInfo;
  children?: React.ReactNode;
}

export function PlaylistHeader({ playlist, children }: PlaylistHeaderProps) {
  const decodeHtmlEntities = (text: string | null) => {
    if (!text) return null;
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
      <div className="relative w-48 h-48 flex-shrink-0">
        <Image
          src={playlist.imageUrl || "/placeholder.svg?height=300&width=300"}
          alt={playlist.title}
          fill
          sizes="(max-width: 768px) 50vw, 200px"
          priority
          className="object-cover rounded-lg bg-gray-100"
        />
      </div>
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <div className="text-sm font-medium uppercase text-gray-600">Playlist</div>
        <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-4 text-gray-900">{playlist.title}</h1>
        {playlist.description && (
          <p className="text-gray-600 text-sm mb-2 max-w-2xl" dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(playlist.description) || '' }} />
        )}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 text-sm text-gray-600">
          <span className="font-medium text-gray-900">{playlist.owner}</span>
          <span className="hidden md:inline">•</span>
          <span>{playlist.followers.toLocaleString()} followers</span>
          <span className="hidden md:inline">•</span>
          <span>{playlist.trackCount} songs</span>
        </div>
        {children}
      </div>
    </div>
  );
}