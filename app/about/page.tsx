import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, ExternalLink, Shield, Zap } from "lucide-react"
import Image from "next/image"
import { GitHub } from "@/components/icons/Github"

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-900">
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[670px] mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About SpotiDown</h1>
          <p className="text-xl text-gray-600 max-w-[670px] mx-auto">
            Spotidown is a random project that i built during my freetime since i love spotify and i want to have my favorite music offline.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-[670px] mx-auto px-4">
          <div className="max-w-[670px] mx-auto">
            <h2 className="text-3xl font-bold mb-6">Why I Built SpotiDown</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                I built SpotiDown because I love Spotify and I want to have my favorite music offline.
                while there are different websites that can download spotify tracks and playlists, they are not free and they are not always reliable and have annoying ads, redirects, no proper metadata, etc.
                I also wanted to learn how to build a full-stack web application using modern technologies, and experiment with the Spotify API, YouTube API, and RapidAPI to handle music retrieval and metadata.
              </p>
            </div>
            <section className="flex flex-col items-center justify-center mt-10 mb-6">
              <Image
                src="/profile.png"
                alt="Manish Tamang Profile photo"
                width={100}
                height={100}
                className="rounded-square border shadow-sm mb-3"
              />
              <h3 className="text-xl font-semibold mb-1">Developer Behind This Project</h3>
              <p className="text-gray-600">
                Made by{" "}
                <a
                  href="https://manishtamang.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-spotify-green underline font-medium hover:text-spotify-green/80"
                >
                  Manish Tamang
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>


      <section className="py-16 bg-gray-50">
        <div className="max-w-[670px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Want to contribute to this project?</h2>
          <p className="text-xl text-gray-600 max-w-[670px] mx-auto mb-8">
            If you're a developer and would like to help, you can contribute to this project by visiting the GitHub repository.
          </p>
          <Link href="https://github.com/Manish-Tamang/spoti-down" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-spotify-green hover:bg-spotify-green/90 text-black">
              View on GitHub
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

