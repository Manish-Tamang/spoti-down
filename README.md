# SpotiDown - Spotify to MP3 Downloader



SpotiDown is a web application built with Next.js (App Router) that allows users to paste Spotify track or playlist URLs and download the corresponding audio as MP3 files. It fetches metadata from Spotify, finds matching audio sources on YouTube, and utilizes a third-party service to provide the MP3 download link.

**Disclaimer:** This tool is intended for personal, private use only, such as creating offline backups of music you legally own or have the rights to access. Downloading copyrighted material without permission is illegal and unethical. Please respect copyright laws and the terms of service of Spotify and YouTube. SpotiDown is not affiliated with Spotify AB.

## Features

- **Spotify Track & Playlist Conversion:** Convert individual tracks or entire playlists from Spotify to MP3
- **Rich Metadata:** Fetches comprehensive track information including title, artist, album, artwork, and duration
- **Smart Source Matching:** Uses YouTube API to find the best audio source matches
- **One-Click Downloads:** Simple interface for quick MP3 downloads of your favorite music
- **Responsive Design:** Fully adaptable UI that works on desktop and mobile devices
- **Dark Theme:** Modern aesthetic using Tailwind CSS and shadcn/ui components

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Forms:** React Hook Form
- **APIs:** Spotify Web API, YouTube Data API v3, RapidAPI (youtube-mp36)
- **Package Manager:** pnpm

## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm (recommended) or npm/yarn
- API Keys:
  - Spotify Client ID & Secret ([Spotify Developer Dashboard](https://developer.spotify.com/dashboard/))
  - YouTube Data API Key ([Google Cloud Console](https://console.cloud.google.com/apis/library/youtube.googleapis.com))
  - RapidAPI Key for `youtube-mp36` ([RapidAPI Hub](https://rapidapi.com/ytjar/api/youtube-mp36))

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/spotidown.git
   cd spotidown
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory:

   ```
   SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
   SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET
   YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY
   RAPIDAPI_KEY=YOUR_RAPIDAPI_KEY

   # Base URL (use appropriate value)
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Start development server:**
   ```bash
   pnpm dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Build

```bash
pnpm build
pnpm start
```

## Project Structure

```
├── app/ # Next.js App Router directory
│ ├── (pages)/ # Route groups for standard pages (about, privacy, etc.)
│ ├── api/ # API Route Handlers
│ │ ├── download/ # Handles MP3 download link generation
│ │ ├── spotify/ # Fetches data from Spotify API
│ │ └── youtube/ # Searches YouTube API
│ ├── playlist/[id]/ # Dynamic route for playlist details
│ ├── track/[id]/ # Dynamic route for track details
│ ├── layout.tsx # Root layout
│ ├── page.tsx # Home page
│ └── globals.css # Global styles
├── components/ # React components
│ ├── ui/ # shadcn/ui components
│ ├── *.tsx # Custom application components (Navbar, Footer, Forms, Cards, etc.)
├── hooks/ # Custom React hooks (use-toast, use-mobile)
├── lib/ # Utility functions and type definitions
│ ├── types.ts # TypeScript type definitions
│ └── utils.ts # Utility functions (cn, fetchWrapper, formatDuration, etc.)
├── public/ # Static assets (images, logos)
├── styles/ # Additional global styles (though most are in app/globals.css)
├── .env.local.example # Example environment variables file
├── next.config.mjs # Next.js configuration
├── tailwind.config.ts # Tailwind CSS configuration
├── tsconfig.json # TypeScript configuration
├── package.json # Project dependencies and scripts
└── pnpm-lock.yaml # pnpm lock file
```

## How It Works

1. **Input:** User pastes a Spotify URL (track or playlist)
2. **Processing:** The app extracts the Spotify ID and type from the URL
3. **Metadata:** Fetches detailed information from Spotify API
4. **Source Matching:** Searches YouTube for the best audio match
5. **Download:** Uses RapidAPI to generate MP3 download links
6. **User Experience:** Clean interface with proper loading states and error handling

## API Endpoints

- **`/api/spotify`**: Fetches metadata from Spotify API
- **`/api/youtube`**: Searches YouTube for matching audio sources
- **`/api/download`**: Generates MP3 download links via RapidAPI

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is currently unlicensed.

---

_SpotiDown - Empowering music lovers to enjoy their favorite tunes offline_
