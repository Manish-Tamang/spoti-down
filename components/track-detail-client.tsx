"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackSkeleton } from "@/components/track-skeleton";
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
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (initialSearchResults.length === 0) {
            fetchYouTubeResults();
        }
    }, []);

    const fetchYouTubeResults = async () => {
        setIsLoading(true);
        try {
            const query = `${track.artist} - ${track.title}`;
            const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
            const res = await fetch(`${baseUrl}/api/youtube?query=${encodeURIComponent(query)}`);
            if (res.ok) {
                const data = await res.json();
                setSearchResults(data.results || []);
            }
        } catch (error) {
            console.error('Error fetching YouTube results:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = async () => {
        if (!selectedVideoId || isDownloading) return;

        setIsDownloading(true);
        try {
            const filename = `${track.artist} - ${track.title}`;
            window.location.href = `/api/download?videoId=${selectedVideoId}&filename=${encodeURIComponent(filename)}.mp3`;
            setTimeout(() => setIsDownloading(false), 4000);
        } catch (error) {
            alert(`Failed to start download: ${error instanceof Error ? error.message : 'Unknown error'}`);
            setIsDownloading(false);
        }
    };

    if (isLoading) {
        return <TrackSkeleton />;
    }

    return (
        <div className="space-y-8">
            {/* Track Header */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-48 h-48 rounded-[4px] overflow-hidden border border-gray-200">
                    <Image
                        src={track.imageUrl || "/placeholder.svg"}
                        alt={`${track.title} cover art`}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">{track.title}</h1>
                    <p className="text-lg text-gray-600">{track.artist}</p>
                    <p className="text-sm text-gray-500">{track.album}</p>
                    <div className="mt-4">
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

            {/* YouTube Results */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Available Downloads</h2>
                <div className="grid gap-4">
                    {searchResults.map((result) => (
                        <div
                            key={result.videoId}
                            className={`flex gap-4 p-4 border border-gray-200 rounded-[4px] transition-colors ${
                                selectedVideoId === result.videoId ? 'bg-gray-50' : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setSelectedVideoId(result.videoId)}
                        >
                            <div className="relative w-24 h-24 rounded-[4px] overflow-hidden">
                                <Image
                                    src={result.thumbnailUrl || "/placeholder.svg"}
                                    alt={result.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900">{result.title}</h3>
                                <p className="text-sm text-gray-600">{result.channel}</p>
                                <p className="text-sm text-gray-500">{result.duration}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}