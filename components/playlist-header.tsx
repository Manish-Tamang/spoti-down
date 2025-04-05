import Image from "next/image"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface PlaylistInfo {
  id: string
  title: string
  description: string
  owner: string
  trackCount: number
  followers: number
  imageUrl: string
}

interface PlaylistHeaderProps {
  playlist: PlaylistInfo
}

export function PlaylistHeader({ playlist }: PlaylistHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
      <div className="relative w-48 h-48 flex-shrink-0">
        <Image
          src={playlist.imageUrl || "/placeholder.svg"}
          alt={playlist.title}
          fill
          className="object-cover rounded-lg shadow-lg"
        />
      </div>

      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <div className="text-sm font-medium uppercase text-zinc-400">Playlist</div>
        <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-4">{playlist.title}</h1>

        {playlist.description && <p className="text-zinc-400 text-sm mb-2 max-w-2xl">{playlist.description}</p>}

        <div className="flex items-center gap-1 text-sm text-zinc-400">
          <span className="font-medium">{playlist.owner}</span>
          <span>•</span>
          <span>{playlist.followers.toLocaleString()} followers</span>
          <span>•</span>
          <span>{playlist.trackCount} songs</span>
        </div>

        <div className="mt-6">
          <Button className="bg-spotify-green hover:bg-spotify-green/90 text-black">
            <Download className="mr-2 h-4 w-4" />
            Download All
          </Button>
        </div>
      </div>
    </div>
  )
}

