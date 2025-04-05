import { NextResponse } from "next/server"

// This is a mock implementation - in a real app, you would use the Spotify API
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const id = searchParams.get("id")

  if (!type || !id) {
    return NextResponse.json({ error: "Missing type or id parameter" }, { status: 400 })
  }

  try {
    // In a real implementation, you would fetch data from Spotify API
    // For now, we'll return mock data
    if (type === "track") {
      return NextResponse.json({
        id,
        title: "Lofi Study Beat",
        artist: "Lofi Artist",
        album: "Chill Beats Collection",
        duration: "3:45",
        imageUrl: "/placeholder.svg?height=300&width=300",
      })
    } else if (type === "playlist") {
      return NextResponse.json({
        id,
        title: "Chill Lofi Study Beats",
        description: "The perfect playlist for studying, relaxing, and focusing on your work.",
        owner: "Spotify",
        trackCount: 25,
        followers: 1250000,
        imageUrl: "/placeholder.svg?height=300&width=300",
        tracks: Array.from({ length: 10 }, (_, i) => ({
          id: `track-${i + 1}`,
          title: `Lofi Study Beat ${i + 1}`,
          artist: `Lofi Artist ${(i % 3) + 1}`,
          album: "Chill Beats Collection",
          duration: `${Math.floor(Math.random() * 2) + 2}:${Math.floor(Math.random() * 60)
            .toString()
            .padStart(2, "0")}`,
          imageUrl: `/placeholder.svg?height=56&width=56`,
        })),
      })
    } else {
      return NextResponse.json({ error: "Invalid type parameter. Must be 'track' or 'playlist'" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error fetching Spotify data:", error)
    return NextResponse.json({ error: "Failed to fetch data from Spotify" }, { status: 500 })
  }
}

