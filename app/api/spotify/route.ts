import { NextRequest, NextResponse } from "next/server";
import { fetchWrapper, formatDuration } from "@/lib/utils";
import {
  SpotifyTokenResponse,
  SpotifyTrack,
  SpotifyPlaylist,
  SpotifyPlaylistTracksResponse,
  TrackInfo,
  PlaylistInfo,
} from "@/lib/types";

let spotifyToken: { accessToken: string; expiresAt: number } | null = null;

async function getSpotifyToken(): Promise<string> {
  const now = Date.now();

  if (spotifyToken && now < spotifyToken.expiresAt) {
    return spotifyToken.accessToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Spotify API credentials missing in environment variables."
    );
  }

  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const response = await fetchWrapper<SpotifyTokenResponse>(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${authString}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    }
  );

  const expiresAt = now + (response.expires_in - 60) * 1000;
  spotifyToken = { accessToken: response.access_token, expiresAt };
  return spotifyToken.accessToken;
}

function getBestImageUrl(
  images: { url: string; width: number | null }[]
): string | null {
  if (!images || images.length === 0) return null;
  return (
    images.sort((a, b) => (b.width ?? 0) - (a.width ?? 0))[0]?.url ||
    images[0]?.url ||
    null
  );
}

function formatTrackInfo(track: SpotifyTrack): TrackInfo | null {
  if (!track || !track.id) return null;
  return {
    id: track.id,
    title: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    artistIds: track.artists.map((a) => a.id),
    album: track.album.name,
    albumId: track.album.id,
    durationMs: track.duration_ms,
    duration: formatDuration(track.duration_ms),
    imageUrl: getBestImageUrl(track.album.images),
    spotifyUrl: track.external_urls?.spotify || "",
    previewUrl: track.preview_url,
  };
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!type || !id) {
    return NextResponse.json(
      { error: "Missing 'type' (track/playlist) or 'id' parameter" },
      { status: 400 }
    );
  }

  if (type !== "track" && type !== "playlist") {
    return NextResponse.json(
      { error: "Invalid 'type'. Must be 'track' or 'playlist'" },
      { status: 400 }
    );
  }

  try {
    const token = await getSpotifyToken();
    const headers = { Authorization: `Bearer ${token}` };

    if (type === "track") {
      const trackData = await fetchWrapper<SpotifyTrack>(
        `https://api.spotify.com/v1/tracks/${id}`,
        { headers }
      );

      const formattedTrack = formatTrackInfo(trackData);
      if (!formattedTrack) {
        return NextResponse.json(
          { error: "Track data not found or invalid" },
          { status: 404 }
        );
      }

      return NextResponse.json(formattedTrack);
    } else {
      const playlistData = await fetchWrapper<SpotifyPlaylist>(
        `https://api.spotify.com/v1/playlists/${id}`,
        { headers }
      );

      const allTracks: TrackInfo[] = [];
      let tracksUrl: string | null =
        playlistData.tracks.href ||
        `https://api.spotify.com/v1/playlists/${id}/tracks?limit=50`;

      while (tracksUrl) {
        const tracksResponse: SpotifyPlaylistTracksResponse =
          await fetchWrapper<SpotifyPlaylistTracksResponse>(tracksUrl, {
            headers,
          });

        const formattedTracks = tracksResponse.items
          .map((item) => formatTrackInfo(item.track as SpotifyTrack))
          .filter((track): track is TrackInfo => track !== null);

        allTracks.push(...formattedTracks);
        tracksUrl = tracksResponse.next;
      }

      const playlistInfo: PlaylistInfo = {
        id: playlistData.id,
        name: playlistData.name,
        description: playlistData.description,
        ownerName: playlistData.owner.display_name,
        ownerUrl: playlistData.owner.external_urls?.spotify,
        trackCount: playlistData.tracks.total,
        followers: playlistData.followers.total,
        imageUrl: getBestImageUrl(playlistData.images),
        spotifyUrl: playlistData.external_urls?.spotify || "",
        tracks: allTracks,
      };

      return NextResponse.json(playlistInfo);
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to fetch data from Spotify";
    const status =
      errorMessage.includes("credentials missing") ||
      errorMessage.includes("authenticate")
        ? 500
        : errorMessage.includes("status: 404")
        ? 404
        : 500;

    if (error instanceof Error && error.message.includes("status: 404")) {
      return NextResponse.json(
        { error: `${type === "track" ? "Track" : "Playlist"} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: errorMessage }, { status });
  }
}
export type { PlaylistInfo, TrackInfo };

