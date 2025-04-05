"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Play, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchResult } from "@/components/search-result";
import type { TrackInfo } from "@/app/api/spotify/route";
import type { YouTubeSearchResult } from "@/app/api/youtube/route";

interface TrackDetailClientProps {
    track: TrackInfo;
    initialSearchResults: YouTubeSearchResult[];
}

export function TrackDetailClient({ track, initialSearchResults }: TrackDetailClientProps) {
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(initialSearchResults?.[0]?.videoId || null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [searchResults, setSearchResults] = useState(initialSearchResults);

    const handleDownload = async () => {
        if (!selectedVideoId || isDownloading) return;

        setIsDownloading(true);
        try {
            const filename = `${track.artist} - ${track.title}`.replace(/[^a-zA-Z0-9\-_ ]/g, '').replace(/\s+/g, '_');
            window.location.href = `/api/download?videoId=${selectedVideoId}&filename=${encodeURIComponent(filename)}.mp3`;
            setTimeout(() => setIsDownloading(false), 4000);
        } catch (error) {
            alert(`Failed to start download: ${error instanceof Error ? error.message : 'Unknown error'}`);
            setIsDownloading(false);
        }
    };

    const handlePreview = () => {
        if (track.previewUrl) {
            try {
                const audio = new Audio(track.previewUrl);
                audio.play();
            } catch (e) {
                alert("Could not play preview audio.");
            }
        } else {
            alert("No preview available for this track.");
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="relative w-64 h-64 flex-shrink-0">
                    <Image
                        src={track.imageUrl || "/placeholder.svg"}
                        alt={track.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                        className="object-cover rounded-lg shadow-lg"
                    />
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="text-sm font-medium uppercase text-zinc-400">Track</div>
                    <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-2">{track.title}</h1>
                    <p className="text-xl text-zinc-300 mb-4">{track.artist}</p>
                    <p className="text-zinc-400 text-sm mb-2">Album: {track.album}</p>
                    <p className="text-zinc-400 text-sm mb-6">Duration: {track.duration}</p>
                    <div className="flex gap-3">
                        <Button
                            className="bg-spotify-green hover:bg-spotify-green/90 text-black"
                            onClick={handlePreview}
                            disabled={!track.previewUrl}
                            title={track.previewUrl ? "Play preview" : "No preview available"}
                        >
                            <Play className="mr-2 h-4 w-4 fill-current" />
                            Preview
                        </Button>
                        <Button
                            variant="outline"
                            disabled={!selectedVideoId || isDownloading}
                            onClick={handleDownload}
                        >
                            {isDownloading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Download className="mr-2 h-4 w-4" />
                            )}
                            {isDownloading ? 'Downloading...' : 'Download MP3'}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Select Audio Source ({searchResults.length} found)</h2>
                {searchResults.length === 0 && (
                    <p className="text-zinc-400">No suitable audio sources found on YouTube.</p>
                )}
                <div className="space-y-4">
                    {searchResults.map((result) => (
                        <SearchResult
                            key={result.videoId}
                            videoId={result.videoId}
                            title={result.title}
                            channel={result.channel}
                            duration={result.duration}
                            thumbnailUrl={result.thumbnailUrl || "/placeholder.svg"}
                            selected={selectedVideoId === result.videoId}
                            onSelect={() => setSelectedVideoId(result.videoId)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}