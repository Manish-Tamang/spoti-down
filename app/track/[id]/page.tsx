"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Download, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchResult, type SearchResultProps } from "@/components/search-result"
import type { Track } from "@/components/track-card"

// Mock data - in a real app, this would come from an API
const getMockTrack = (id: string): Track => {
  return {
    id,
    title: "Lofi Study Beat",
    artist: "Lofi Artist",
    album: "Chill Beats Collection",
    duration: "3:45",
    imageUrl: "/placeholder.svg?height=300&width=300",
  }
}

// Mock search results
const getMockSearchResults = (): Omit<SearchResultProps, "onSelect" | "selected">[] => {
  return Array.from({ length: 3 }, (_, i) => ({
    videoId: `video-${i + 1}`,
    title: `Lofi Study Beat - Extended Mix ${i + 1}`,
    channel: `YouTube Channel ${(i % 3) + 1}`,
    duration: `${Math.floor(Math.random() * 2) + 3}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0")}`,
    thumbnailUrl: `/placeholder.svg?height=68&width=120`,
  }))
}

export default function TrackPage({ params }: { params: { id: string } }) {
  const track = getMockTrack(params.id)
  const searchResults = getMockSearchResults()
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-800 to-black text-white">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="relative w-64 h-64 flex-shrink-0">
            <Image
              src={track.imageUrl || "/placeholder.svg"}
              alt={track.title}
              fill
              className="object-cover rounded-lg shadow-lg"
            />
            <Button
              size="icon"
              className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 rounded-lg transition-opacity w-full h-full"
            >
              <Play className="h-12 w-12 text-white" />
            </Button>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-sm font-medium uppercase text-zinc-400">Track</div>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-2">{track.title}</h1>
            <p className="text-xl text-zinc-300 mb-4">{track.artist}</p>
            <p className="text-zinc-400 text-sm mb-2">Album: {track.album}</p>
            <p className="text-zinc-400 text-sm mb-6">Duration: {track.duration}</p>

            <div className="flex gap-3">
              <Button className="bg-spotify-green hover:bg-spotify-green/90 text-black">
                <Play className="mr-2 h-4 w-4 fill-current" />
                Preview
              </Button>
              <Button variant="outline" disabled={!selectedVideoId}>
                <Download className="mr-2 h-4 w-4" />
                Download MP3
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Select Audio Source</h2>
          <div className="space-y-4">
            {searchResults.map((result) => (
              <SearchResult
                key={result.videoId}
                {...result}
                selected={selectedVideoId === result.videoId}
                onSelect={() => setSelectedVideoId(result.videoId)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

