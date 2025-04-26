"use client"
import Image from "next/image"
import Link from "next/link"
import { Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  imageUrl: string
}

interface TrackCardProps {
  track: Track
  index?: number
  showIndex?: boolean
  compact?: boolean
}

export function TrackCard({ track, index, showIndex = false, compact = false }: TrackCardProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isDownloading) return

    setIsDownloading(true)

    try {
      const searchQuery = `${track.artist} - ${track.title}`
      const youtubeRes = await fetch(`/api/youtube?query=${encodeURIComponent(searchQuery)}`)
      if (!youtubeRes.ok) {
        throw new Error(`Failed to search YouTube: ${await youtubeRes.text()}`)
      }
      const youtubeData = await youtubeRes.json()

      if (!youtubeData.results || youtubeData.results.length === 0) {
        alert("Could not find a suitable audio source on YouTube.")
        throw new Error("No YouTube results found")
      }

      const firstResult = youtubeData.results[0]
      const videoId = firstResult.videoId
      const filename = `${track.artist} - ${track.title}`.replace(/[^a-zA-Z0-9\-_]/g, '_')

      window.location.href = `/api/download?videoId=${videoId}&filename=${encodeURIComponent(filename)}`

      setTimeout(() => setIsDownloading(false), 3000)
    } catch (error) {
      console.error("Download failed:", error)
      alert(`Download failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setIsDownloading(false)
    }
  }

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors ${compact ? "py-2" : "py-3"}`}>
      {showIndex && <div className="w-6 text-center text-gray-600 font-medium">{index}</div>}
      <div className="relative flex-shrink-0">
        <Image
          src={track.imageUrl || "/placeholder.svg"}
          alt={track.album}
          width={compact ? 40 : 56}
          height={compact ? 40 : 56}
          className="rounded object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <Link href={`/track/${track.id}`} className="hover:underline">
          <h3 className={`font-medium truncate text-gray-900 ${compact ? "text-sm" : "text-base"}`}>{track.title}</h3>
        </Link>
        <p className={`text-gray-600 truncate ${compact ? "text-xs" : "text-sm"}`}>{track.artist}</p>
      </div>
      {!compact && <div className="text-sm text-gray-600">{track.duration}</div>}
      <Button
        size="icon"
        variant="ghost"
        className="text-gray-600 hover:text-gray-900"
        onClick={handleDownload}
        disabled={isDownloading}
        title="Download MP3"
      >
        {isDownloading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}