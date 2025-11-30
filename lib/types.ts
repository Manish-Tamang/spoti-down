export interface SpotifyTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
  }
  
  export interface SpotifyImage {
    url: string;
    height: number | null;
    width: number | null;
  }
  
  export interface SpotifyArtist {
    id: string;
    name: string;
    external_urls: { spotify: string };
  }
  
  export interface SpotifyAlbum {
    id: string;
    name: string;
    images: SpotifyImage[];
    release_date: string;
    external_urls: { spotify: string };
  }
  
  export interface SpotifyTrack {
    id: string;
    name: string;
    artists: SpotifyArtist[];
    album: SpotifyAlbum;
    duration_ms: number;
    external_urls: { spotify: string };
    preview_url: string | null;
  }
  
  export interface SpotifyPlaylistTrackItem {
    track: SpotifyTrack | null;
    added_at: string;
  }
  
  export interface SpotifyPlaylistTracksResponse {
    items: SpotifyPlaylistTrackItem[];
    next: string | null;
    limit: number;
    offset: number;
    total: number;
    href: string;
  }
  
  export interface SpotifyPlaylist {
    id: string;
    name: string;
    description: string;
    images: SpotifyImage[];
    owner: {
      id: string;
      display_name: string;
      external_urls: { spotify: string };
    };
    tracks: SpotifyPlaylistTracksResponse;
    followers: { total: number };
    external_urls: { spotify: string };
  }
  
  export interface TrackInfo {
    id: string;
    title: string;
    artist: string;
    artistIds?: string[];
    album: string;
    albumId?: string;
    duration: string;
    durationMs: number;
    imageUrl: string | null;
    spotifyUrl: string;
    previewUrl: string | null;
  }
  
  export interface PlaylistInfo {
    id: string;
    name: string;
    description: string;
    ownerName: string;
    ownerUrl?: string;
    trackCount: number;
    followers: number;
    imageUrl: string | null;
    spotifyUrl: string;
    tracks: TrackInfo[];
  }
  
  export interface YouTubeThumbnail {
    url: string;
    width: number;
    height: number;
  }
  
  export interface YouTubeThumbnails {
    default?: YouTubeThumbnail;
    medium?: YouTubeThumbnail;
    high?: YouTubeThumbnail;
    standard?: YouTubeThumbnail;
    maxres?: YouTubeThumbnail;
  }
  
  export interface YouTubeSearchItemSnippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: YouTubeThumbnails;
    channelTitle: string;
  }
  
  export interface YouTubeSearchItemId {
    kind: string;
    videoId: string;
  }
  
  export interface YouTubeSearchItem {
    kind: string;
    etag: string;
    id: YouTubeSearchItemId;
    snippet: YouTubeSearchItemSnippet;
  }
  
  export interface YouTubeSearchResponse {
    kind: string;
    etag: string;
    nextPageToken?: string;
    prevPageToken?: string;
    regionCode: string;
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
    items: YouTubeSearchItem[];
  }
  
  export interface YouTubeVideoContentDetails {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    projection: string;
  }
  
  export interface YouTubeVideoItem {
    kind: string;
    etag: string;
    id: string;
    contentDetails: YouTubeVideoContentDetails;
  }
  
  export interface YouTubeVideosResponse {
    kind: string;
    etag: string;
    items: YouTubeVideoItem[];
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
  }
  
  export interface YouTubeSearchResult {
    videoId: string;
    title: string;
    channel: string;
    thumbnailUrl: string | null;
    duration: string;
  }