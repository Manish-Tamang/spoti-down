import { InputForm } from "@/components/input-form";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-white text-gray-900">
      <div className="w-full max-w-3xl mx-auto space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Spotify to MP3 Downloader
          </h1>
          <p className="text-lg text-gray-600">
            Convert your favorite Spotify playlists and tracks to MP3 files in
            seconds
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-[4px] border border-gray-200">
          <InputForm />
        </div>

        <div className="p-6 bg-gray-50 rounded-[4px] space-y-4 border border-gray-200">
          <h2 className="text-xl font-semibold">How it works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-4 rounded-[4px] bg-white border border-gray-200">
              <div className="w-12 h-12 flex items-center justify-center rounded-[4px] bg-green-100 mb-3 border border-gray-200">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="font-medium">Paste Spotify URL</h3>
              <p className="text-sm text-gray-600 mt-2">
                Enter any Spotify track or playlist URL
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-[4px] bg-white border border-gray-200">
              <div className="w-12 h-12 flex items-center justify-center rounded-[4px] bg-green-100 mb-3">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="font-medium">Process Content</h3>
              <p className="text-sm text-gray-600 mt-2">
                We'll fetch metadata and find matching audio
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-[4px] bg-white border border-gray-200">
              <div className="w-12 h-12 flex items-center justify-center rounded-[4px] bg-green-100 mb-3">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="font-medium">Download MP3s</h3>
              <p className="text-sm text-gray-600 mt-2">
                Get high-quality MP3 files of your music
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
