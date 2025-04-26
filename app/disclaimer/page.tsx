export default function DisclaimerPage() {
  return (
    <div className="bg-white text-gray-900">
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Disclaimer</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">Last updated: April 5, 2025</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-gray">
            <h2>1. Purpose of Service</h2>
            <p>
              SpotiDown is designed to help users convert Spotify tracks and playlists to MP3 format for personal,
              non-commercial use only. Our service is intended to facilitate offline listening of content that users
              already have legitimate access to through proper subscriptions or purchases.
            </p>

            <h2>2. Copyright and Intellectual Property</h2>
            <p>
              SpotiDown respects the intellectual property rights of others and expects its users to do the same. We do
              not encourage, support, or condone copyright infringement or the unauthorized reproduction, distribution,
              or public performance of copyrighted materials.
            </p>
            <p>
              Users of SpotiDown are solely responsible for ensuring that their use of our service complies with
              applicable copyright laws and the terms of service of any third-party platforms, including Spotify. By
              using SpotiDown, you represent and warrant that you have the legal right to access and download any
              content you process through our service.
            </p>

            <h2>3. No Affiliation with Spotify</h2>
            <p>
              SpotiDown is not affiliated with, endorsed by, or in any way officially connected with Spotify AB or any
              of its subsidiaries or affiliates. The official Spotify website can be found at www.spotify.com.
            </p>
            <p>
              "Spotify" and the Spotify logo are registered trademarks of Spotify AB. These trademarks are used on our
              website for identification purposes only and do not imply any endorsement or affiliation.
            </p>

            <h2>4. Limitation of Liability</h2>
            <p>
              SpotiDown provides its service on an "as is" and "as available" basis. We make no warranties, expressed or
              implied, regarding the reliability, accuracy, or availability of our service.
            </p>
            <p>
              In no event shall SpotiDown be liable for any direct, indirect, incidental, special, consequential, or
              punitive damages, including but not limited to, loss of profits, data, use, goodwill, or other intangible
              losses, resulting from:
            </p>
            <ul>
              <li>Your use or inability to use our service</li>
              <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
              <li>Any interruption or cessation of transmission to or from our service</li>
              <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our service</li>
              <li>
                Any errors or omissions in any content or for any loss or damage of any kind incurred as a result of the
                use of any content posted, transmitted, or otherwise made available via our service
              </li>
            </ul>

            <h2>5. User Responsibility</h2>
            <p>Users are responsible for their actions while using SpotiDown. By using our service, you agree to:</p>
            <ul>
              <li>Use the service only for lawful purposes and in accordance with applicable laws and regulations</li>
              <li>Respect the intellectual property rights of content creators and rights holders</li>
              <li>Use downloaded content for personal, non-commercial purposes only</li>
              <li>Not redistribute, sell, or publicly perform downloaded content without proper authorization</li>
            </ul>

            <h2>6. Changes to This Disclaimer</h2>
            <p>
              We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon
              posting on our website. Your continued use of SpotiDown after any modifications indicates your acceptance
              of the updated disclaimer.
            </p>

            <h2>7. Contact Us</h2>
            <p>If you have any questions about this disclaimer, please contact us at legal@spotidown.com.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

