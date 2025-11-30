import { SpotifyTokenResponse } from "./types";

let spotifyToken: { accessToken: string; expiresAt: number } | null = null;

export async function getSpotifyAccessToken(): Promise<string> {
  const now = Date.now();

  if (spotifyToken && now < spotifyToken.expiresAt) {
    return spotifyToken.accessToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Spotify API credentials missing in environment variables.");
  }

  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error("Failed to get Spotify access token");
  }

  const data: SpotifyTokenResponse = await response.json();
  const expiresAt = now + (data.expires_in - 60) * 1000;
  spotifyToken = { accessToken: data.access_token, expiresAt };
  return spotifyToken.accessToken;
} 