import Image from "next/image"
import Link from "next/link"
import { Download, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface Track {
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
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800/50 transition-colors ${compact ? "py-2" : "py-3"}`}
    >
      {showIndex && <div className="w-6 text-center text-zinc-400 font-medium">{index}</div>}

      <div className="relative flex-shrink-0">
        <Image
          src={track.imageUrl || "/placeholder.svg"}
          alt={track.album}
          width={compact ? 40 : 56}
          height={compact ? 40 : 56}
          className="rounded object-cover"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 rounded transition-opacity w-full h-full"
        >
          <Play className="h-5 w-5 text-white" />
        </Button>
      </div>

      <div className="flex-1 min-w-0">
        <Link href={`/track/${track.id}`} className="hover:underline">
          <h3 className={`font-medium truncate ${compact ? "text-sm" : "text-base"}`}>{track.title}</h3>
        </Link>
        <p className={`text-zinc-400 truncate ${compact ? "text-xs" : "text-sm"}`}>{track.artist}</p>
      </div>

      {!compact && <div className="text-sm text-zinc-400">{track.duration}</div>}

      <Button size="icon" variant="ghost" className="text-zinc-400 hover:text-white">
        <Download className="h-4 w-4" />
      </Button>
    </div>
  )
}

