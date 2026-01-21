import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <div className="flex items-center gap-2 text-lg">
            <Link href="/" className="hover:text-red-600 transition-colors">
              Home
            </Link>
            <span className="text-red-600">•</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <div>
              <p className="text-sm text-gray-500 mb-4">Last Updated: January 14, 2026</p>
              <p className="text-lg">
                At Car Junction LLC, we are committed to protecting your privacy and ensuring the
                security of your personal information. This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website or use our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Information We Collect</h2>
              <h3 className="text-xl font-semibold text-black mb-2">Personal Information</h3>
              <p className="mb-4">We may collect personal information that you voluntarily provide to us when you:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fill out financing applications</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us via phone, email, or contact forms</li>
                <li>Create an account on our website</li>
                <li>Schedule test drives or service appointments</li>
              </ul>
              <p className="mt-4">
                This information may include: name, email address, phone number, mailing address, driver's license
                information, Social Security number (for credit applications), employment information, and financial
                information.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-black mb-2">Automatically Collected Information</h3>
              <p>
                When you visit our website, we may automatically collect certain information about your device and
                browsing actions, including: IP address, browser type, operating system, referring URLs, pages viewed,
                and time spent on pages.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process vehicle purchases and financing applications</li>
                <li>Communicate with you about your inquiries and purchases</li>
                <li>Send you promotional materials and newsletters (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and enhance security</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Information Sharing and Disclosure</h2>
              <p className="mb-4">We may share your information with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Financial Institutions:</strong> To process financing applications and secure vehicle loans
                </li>
                <li>
                  <strong>Service Providers:</strong> Third-party vendors who assist with our business operations
                </li>
                <li>
                  <strong>Legal Authorities:</strong> When required by law or to protect our rights
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition
                </li>
              </ul>
              <p className="mt-4">We do not sell your personal information to third parties for marketing purposes.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal
                information. However, no method of transmission over the internet is 100% secure, and we cannot
                guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Your Rights and Choices</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and review your personal information</li>
                <li>Request corrections to your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Disable cookies through your browser settings</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal
                information from children.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Contact Us</h2>
              <p className="mb-2">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
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
