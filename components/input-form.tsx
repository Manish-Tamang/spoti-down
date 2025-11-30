"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Music, Loader2 } from "lucide-react";
import { IoIosMusicalNotes } from "react-icons/io";
import { toast } from "sonner";

export function InputForm() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) return;

    setIsLoading(true);

    // Extract Spotify ID and type (track or playlist)
    const spotifyUrlPattern = /spotify\.com\/(track|playlist)\/([a-zA-Z0-9]+)/;
    const match = url.match(spotifyUrlPattern);

    if (match) {
      const [, type, id] = match;
      setTimeout(() => {
        router.push(`/${type}/${id}`);
        setIsLoading(false);
      }, 1500);
    } else {
      setIsLoading(false);
      toast.error("Please enter a valid Spotify track or playlist URL");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="spotify-url"
          className="text-sm font-medium text-zinc-900"
        >
          Spotify URL
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <IoIosMusicalNotes className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              id="spotify-url"
              placeholder="https://open.spotify.com/track/..."
              className="pl-9 bg-white border-zinc-300 rounded-square text-zinc-900 placeholder:text-zinc-400"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading || !url}
            className="bg-spotify-green hover:bg-spotify-green/90 text-black rounded-square"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              "Convert"
            )}
          </Button>
        </div>
        <p className="text-xs text-zinc-600">
          Paste a Spotify track or playlist URL to convert to MP3
        </p>
      </div>
    </form>
  );
}
