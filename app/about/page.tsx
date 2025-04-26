import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Shield, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About SpotiDown</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to make your favorite music accessible anywhere, anytime, even when you're offline.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                SpotiDown was born out of a simple need: to enjoy our favorite music without being constrained by
                internet connectivity or subscription services.
              </p>
              <p>
                As music enthusiasts, we understand the frustration of not being able to access your carefully curated
                playlists when you're traveling, in areas with poor connectivity, or simply when you want to save your
                mobile data.
              </p>
              <p>
                Our team of developers and music lovers came together to create a solution that bridges this gap,
                allowing you to take your music anywhere while maintaining the highest audio quality possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What Makes Us Different</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-spotify-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-gray-600">
                Our advanced processing technology ensures quick conversions without compromising on quality.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-spotify-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">High Quality</h3>
              <p className="text-gray-600">
                We prioritize audio quality, ensuring your downloads sound as good as streaming.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-spotify-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
              <p className="text-gray-600">Your privacy matters. We don't store your music or personal information.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Try SpotiDown?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Start converting your favorite Spotify tracks and playlists to MP3 today.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-spotify-green hover:bg-spotify-green/90 text-black">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

