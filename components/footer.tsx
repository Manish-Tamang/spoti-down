import Link from "next/link"
import { Music2, Github, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-600">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          { }
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">SpotiDown</span>
            </Link>
            <p className="text-sm">
              Convert your favorite Spotify playlists and tracks to MP3 files with ease. High-quality audio for your
              offline listening needs.
            </p>
          </div>

          { }
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-900 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-gray-900 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          { }
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:text-gray-900 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-gray-900 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          { }
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Connect</h3>
            <div className="flex space-x-4">
              <Link href="https://github.com/Manish-Tamang" className="hover:text-gray-900 transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://x.com/Manishtamangxyz" className="hover:text-gray-900 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-gray-900 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-xs">
          <p>© {new Date().getFullYear()} SpotiDown. All rights reserved.</p>
          <p className="mt-2">SpotiDown is not affiliated with Spotify. Spotify is a trademark of Spotify AB.</p>
        </div>
      </div>
    </footer>
  )
}

