"use client"

import Image from "next/image"
import { Check, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface SearchResultProps {
  videoId: string
  title: string
  channel: string
  duration: string
  thumbnailUrl: string
  selected?: boolean
  onSelect?: () => void
}

export function SearchResult({
  videoId,
  title,
  channel,
  duration,
  thumbnailUrl,
  selected = false,
  onSelect,
}: SearchResultProps) {
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border ${selected ? "border-green-500 bg-zinc-800/50" : "border-zinc-800 hover:border-zinc-700"} transition-colors`}
    >
      <div className="relative flex-shrink-0">
        <Image
          src={thumbnailUrl || "/placeholder.svg"}
          alt={title}
          width={120}
          height={68}
          className="rounded object-cover"
        />
        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">{duration}</div>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm line-clamp-2">{title}</h3>
        <p className="text-zinc-400 text-xs mt-1">{channel}</p>

        <div className="mt-3 flex gap-2">
          <Button
            size="sm"
            variant={selected ? "default" : "outline"}
            className={selected ? "bg-green-600 hover:bg-green-700" : ""}
            onClick={onSelect}
          >
            {selected ? (
              <>
                <Check className="mr-1 h-3 w-3" />
                Selected
              </>
            ) : (
              "Select"
            )}
          </Button>

          {selected && (
            <Button size="sm" variant="outline">
              <Download className="mr-1 h-3 w-3" />
              Download
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

