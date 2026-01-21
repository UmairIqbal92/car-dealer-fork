import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
          <div className="flex items-center gap-2 text-lg">
            <Link href="/" className="hover:text-red-600 transition-colors">
              Home
            </Link>
            <span className="text-red-600">•</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <div>
              <p className="text-sm text-gray-500 mb-4">Last Updated: January 14, 2026</p>
              <p className="text-lg">
                Welcome to Car Junction LLC. By accessing or using our website and services, you agree to
                be bound by these Terms of Service. Please read them carefully.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this
                agreement. If you do not agree to these Terms of Service, please do not use our website or services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">2. Use of Website</h2>
              <h3 className="text-xl font-semibold text-black mb-2">Permitted Use</h3>
              <p className="mb-4">You may use our website for lawful purposes only. You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violate any applicable local, state, national, or international law</li>
                <li>Infringe upon or violate our intellectual property rights or the rights of others</li>
                <li>Transmit any harmful code, viruses, or malicious software</li>
                <li>Attempt to gain unauthorized access to our systems or networks</li>
                <li>Use the website for any fraudulent or unlawful purpose</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">3. Vehicle Information and Pricing</h2>
              <p className="mb-4">
                We make every effort to ensure that vehicle information, specifications, and pricing displayed on our
                website are accurate. However:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All vehicle information is subject to change without notice</li>
                <li>Prices do not include taxes, registration fees, or documentation fees</li>
                <li>Vehicle availability is subject to prior sale</li>
                <li>Photos are for illustration purposes and may not represent the actual vehicle</li>
                <li>We reserve the right to correct any errors or inaccuracies</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">4. Financing and Credit Applications</h2>
              <p>
                When you submit a financing or credit application through our website, you authorize us to obtain your
                credit report and share your information with lending institutions. All financing is subject to credit
                approval, and terms may vary based on creditworthiness.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">5. Vehicle Condition and Warranties</h2>
              <p className="mb-4">
                All vehicles are sold "as-is" unless otherwise stated in writing. While we inspect our vehicles:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We make no warranty as to the condition of any vehicle</li>
                <li>Used vehicles may have wear and tear consistent with their age and mileage</li>
                <li>We encourage you to inspect any vehicle before purchase</li>
                <li>Extended warranties may be available for purchase</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">6. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, and software, is the property of
                Car Junction LLC or its content suppliers and is protected by copyright and other
                intellectual property laws. You may not reproduce, distribute, or create derivative works without our
                express written permission.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">7. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the content, accuracy,
                or practices of these external sites. Your use of third-party websites is at your own risk.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">8. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Car Junction LLC shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages arising out of or related to your use
                of our website or services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">9. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Car Junction LLC and its affiliates from any
                claims, damages, losses, or expenses (including legal fees) arising from your use of our website or
                violation of these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">10. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately
                upon posting to the website. Your continued use of the website after any changes indicates your
                acceptance of the new terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">11. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of the State of
                Texas, without regard to its conflict of law provisions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">12. Contact Information</h2>
              <p className="mb-2">If you have any questions about these Terms of Service, please contact us:</p>
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
