import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare } from "lucide-react"

export default function SupportPage() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Support Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get help with SpotiDown. Find answers to common questions or contact our support team.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-gray-200">
                <AccordionTrigger className="text-left">How does SpotiDown work?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  SpotiDown works by extracting metadata from Spotify tracks and playlists, then finding matching audio
                  from various sources. The audio is processed to ensure high quality, and then made available for
                  download as MP3 files.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-gray-200">
                <AccordionTrigger className="text-left">Is SpotiDown free to use?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  SpotiDown offers both free and premium tiers. The free tier allows a limited number of downloads per
                  day with standard quality, while the premium subscription offers unlimited downloads with high-quality
                  audio and no ads.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-gray-200">
                <AccordionTrigger className="text-left">What audio quality do the downloads have?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Our free tier provides 128 kbps MP3 files, which is good for casual listening. Premium users get
                  access to 320 kbps MP3 files, which is the highest quality MP3 format available and comparable to
                  Spotify's premium streaming quality.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-gray-200">
                <AccordionTrigger className="text-left">Is it legal to download music from Spotify?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  SpotiDown is designed for personal use only. We recommend using our service to download music you
                  already have access to through legitimate subscriptions, for offline listening purposes. Always
                  respect copyright laws and artists' rights.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-gray-200">
                <AccordionTrigger className="text-left">How long does it take to process a playlist?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Processing time depends on the size of the playlist. Single tracks are usually ready within seconds,
                  while larger playlists may take a few minutes. Premium users enjoy faster processing times.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-gray-200">
                <AccordionTrigger className="text-left">Can I download podcasts from Spotify?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Currently, SpotiDown only supports music tracks and playlists. Podcast downloading is not available at
                  this time, but we're considering adding this feature in the future.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="h-6 w-6 text-spotify-green" />
              <h2 className="text-3xl font-bold">Contact Us</h2>
            </div>

            <p className="mb-8 text-gray-600">
              Can't find what you're looking for? Send us a message and our support team will get back to you as soon as
              possible.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" className="bg-white border-gray-200" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    className="bg-white border-gray-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="What is your message about?" className="bg-white border-gray-200" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  className="min-h-[150px] bg-white border-gray-200"
                />
              </div>

              <Button type="submit" className="bg-spotify-green hover:bg-spotify-green/90 text-black">
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

