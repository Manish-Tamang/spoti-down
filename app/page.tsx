import { InputForm } from "@/components/input-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-white text-gray-900">
      <div className="w-full max-w-[670px] mx-auto space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Spotify to MP3 Downloader
          </h1>
          <p className="text-lg text-gray-600">
            Convert your favorite Spotify playlists and tracks to MP3 files in
            seconds
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-square border border-gray-200">
          <InputForm />
        </div>

        <div className="p-6 space-y-4 border">
          <h2 className="text-xl font-semibold mb-2">How it works</h2>
          <div>
            <Accordion type="single" collapsible className="w-full" defaultValue="step-1">
              <AccordionItem value="step-1">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded bg-green-100 border border-gray-200 text-base font-bold">
                      1
                    </div>
                    <span>Paste Spotify URL</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600 mt-2">
                    Enter any Spotify track or playlist URL.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step-2">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded bg-green-100 border border-gray-200 text-base font-bold">
                      2
                    </div>
                    <span>Process Content</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600 mt-2">
                    We'll fetch metadata and find matching audio.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step-3">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded bg-green-100 border border-gray-200 text-base font-bold">
                      3
                    </div>
                    <span>Download MP3s</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600 mt-2">
                    Get high-quality MP3 files of your music.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
