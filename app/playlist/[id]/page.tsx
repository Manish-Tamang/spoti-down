import { PlaylistHeader, type PlaylistInfo } from "@/components/playlist-header"
import { type Track, TrackCard } from "@/components/track-card"

// Mock data - in a real app, this would come from an API
const getMockPlaylist = (id: string): PlaylistInfo => {
  return {
    id,
    title: "Chill Lofi Study Beats",
    description: "The perfect playlist for studying, relaxing, and focusing on your work.",
    owner: "Spotify",
    trackCount: 25,
    followers: 1250000,
    imageUrl: "/placeholder.svg?height=300&width=300",
  }
}

// Mock tracks data
const getMockTracks = (playlistId: string): Track[] => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `track-${i + 1}`,
    title: `Lofi Study Beat ${i + 1}`,
    artist: `Lofi Artist ${(i % 3) + 1}`,
    album: "Chill Beats Collection",
    duration: `${Math.floor(Math.random() * 2) + 2}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0")}`,
    imageUrl: `/placeholder.svg?height=56&width=56`,
  }))
}

export default function PlaylistPage({ params }: { params: { id: string } }) {
  const playlist = getMockPlaylist(params.id)
  const tracks = getMockTracks(params.id)

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-800 to-black text-white">
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <PlaylistHeader playlist={playlist} />

        <div className="mt-8">
          <div className="border-b border-zinc-800 pb-2 mb-4">
            <div className="flex items-center gap-3 px-3 text-sm text-zinc-400">
              <div className="w-6 text-center">#</div>
              <div className="w-12"></div>
              <div className="flex-1">Title</div>
              <div>Duration</div>
              <div className="w-10"></div>
            </div>
          </div>

          <div className="space-y-1">
            {tracks.map((track, index) => (
              <TrackCard key={track.id} track={track} index={index + 1} showIndex={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

