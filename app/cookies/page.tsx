import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Cookies Policy</h1>
          <div className="flex items-center gap-2 text-lg">
            <Link href="/" className="hover:text-red-600 transition-colors">
              Home
            </Link>
            <span className="text-red-600">•</span>
            <span>Cookies Policy</span>
          </div>
        </div>
      </section>

      {/* Cookies Policy Content */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <div>
              <p className="text-sm text-gray-500 mb-4">Last Updated: January 14, 2026</p>
              <p className="text-lg">
                This Cookies Policy explains how Car Junction LLC uses cookies and similar technologies
                to recognize you when you visit our website. It explains what these technologies are, why we use them,
                and your rights to control our use of them.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">What Are Cookies?</h2>
              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website.
                Cookies are widely used by website owners to make their websites work more efficiently and provide
                reporting information. Cookies set by the website owner (in this case, Car Junction LLC) are called
                "first-party cookies." Cookies set by parties other than the website owner are called "third-party
                cookies."
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Why We Use Cookies</h2>
              <p className="mb-4">We use first-party and third-party cookies for several reasons:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Essential Cookies:</strong> Required for the website to function properly, such as maintaining
                  your session and remembering your preferences
                </li>
                <li>
                  <strong>Performance Cookies:</strong> Help us understand how visitors interact with our website by
                  collecting anonymous information
                </li>
                <li>
                  <strong>Functionality Cookies:</strong> Remember your choices (such as language or region) to provide
                  enhanced features
                </li>
                <li>
                  <strong>Targeting/Advertising Cookies:</strong> Deliver relevant advertisements and track the
                  effectiveness of advertising campaigns
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Types of Cookies We Use</h2>

              <div className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-black mb-2">Essential Website Cookies</h3>
                  <p className="mb-2">
                    These cookies are strictly necessary to provide you with services available through our website.
                  </p>
                  <p className="text-sm">
                    <strong>Examples:</strong> Session cookies, security cookies, load balancing cookies
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-black mb-2">Analytics and Performance Cookies</h3>
                  <p className="mb-2">
                    These cookies help us understand how visitors interact with our website by collecting and reporting
                    information anonymously.
                  </p>
                  <p className="text-sm">
                    <strong>Examples:</strong> Google Analytics cookies that track page views, bounce rates, and user
                    behavior
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-black mb-2">Functionality Cookies</h3>
                  <p className="mb-2">
                    These cookies enable the website to provide enhanced functionality and personalization based on your
                    interactions.
                  </p>
                  <p className="text-sm">
                    <strong>Examples:</strong> Cookies that remember your vehicle search preferences, favorite vehicles,
                    or preferred contact method
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-black mb-2">Advertising and Marketing Cookies</h3>
                  <p className="mb-2">
                    These cookies track your browsing habits to deliver advertisements that are more relevant to you and
                    your interests.
                  </p>
                  <p className="text-sm">
                    <strong>Examples:</strong> Facebook Pixel, Google Ads cookies, retargeting cookies
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Third-Party Cookies</h2>
              <p className="mb-4">
                In addition to our own cookies, we may use various third-party cookies to report usage statistics,
                deliver advertisements, and provide enhanced functionality:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Google Analytics:</strong> For website traffic analysis
                </li>
                <li>
                  <strong>Facebook Pixel:</strong> For targeted advertising on social media
                </li>
                <li>
                  <strong>YouTube:</strong> For embedded video content
                </li>
                <li>
                  <strong>Advertising Networks:</strong> For displaying relevant ads across the internet
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">How to Control Cookies</h2>
              <p className="mb-4">
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie
                preferences by:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Browser Settings:</strong> Most web browsers allow you to control cookies through their
                  settings. Visit your browser's help section for instructions.
                </li>
                <li>
                  <strong>Opt-Out Tools:</strong> You can opt-out of interest-based advertising by visiting the Network
                  Advertising Initiative or Digital Advertising Alliance websites.
                </li>
                <li>
                  <strong>Do Not Track:</strong> Some browsers support "Do Not Track" signals, though we cannot
                  guarantee that all third parties will honor them.
                </li>
              </ul>
              <p className="mt-4 text-sm bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <strong>Important:</strong> If you choose to reject cookies, you may not be able to use certain features
                of our website, and your experience may be affected.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Browser-Specific Cookie Management</h2>
              <p className="mb-4">To manage cookies, please refer to your browser's documentation:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data
                </li>
                <li>
                  <strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data
                </li>
                <li>
                  <strong>Safari:</strong> Preferences → Privacy → Cookies and website data
                </li>
                <li>
                  <strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Updates to This Policy</h2>
              <p>
                We may update this Cookies Policy from time to time to reflect changes in technology, legislation, or
                our business practices. We encourage you to review this policy periodically.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Contact Us</h2>
              <p className="mb-2">If you have any questions about our use of cookies, please contact us:</p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-semibold text-black">Car Junction LLC</p>
                <p>2435 Glenda Ln Ste 4, Dallas, TX 75229</p>
                <p>Email: cjunctionllc@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
