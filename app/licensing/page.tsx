import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

export default function LicensingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Licensing Information</h1>
          <div className="flex items-center gap-2 text-lg">
            <Link href="/" className="hover:text-red-600 transition-colors">
              Home
            </Link>
            <span className="text-red-600">•</span>
            <span>Licensing</span>
          </div>
        </div>
      </section>

      {/* Licensing Content */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <div>
              <p className="text-lg">
                Car Junction LLC operates as a licensed independent automotive dealer in the State of
                Texas. We are committed to maintaining the highest standards of professionalism and compliance with all
                applicable state and federal regulations.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Dealer License Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                <div>
                  <p className="font-semibold text-black">Business Name:</p>
                  <p>Car Junction LLC</p>
                </div>
                <div>
                  <p className="font-semibold text-black">Business Address:</p>
                  <p>2435 Glenda Ln Ste 4, Dallas, TX 75229</p>
                </div>
                <div>
                  <p className="font-semibold text-black">State:</p>
                  <p>Texas</p>
                </div>
                <div>
                  <p className="font-semibold text-black">Regulatory Authority:</p>
                  <p>Texas Department of Motor Vehicles (TxDMV)</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Texas Motor Vehicle Dealer Requirements</h2>
              <p className="mb-4">
                As a licensed motor vehicle dealer in Texas, we comply with all requirements set forth by the Texas
                Department of Motor Vehicles, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Maintaining a valid General Distinguishing Number (GDN)</li>
                <li>Meeting minimum facility and signage requirements</li>
                <li>Carrying required surety bonds and insurance coverage</li>
                <li>Following all advertising and disclosure regulations</li>
                <li>Adhering to consumer protection laws and warranty requirements</li>
                <li>Proper titling, registration, and documentation procedures</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Consumer Protection</h2>
              <p className="mb-4">We are committed to consumer protection and comply with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Texas Motor Vehicle Commission Code:</strong> Governing standards for dealer operations
                </li>
                <li>
                  <strong>Texas Deceptive Trade Practices Act:</strong> Protecting consumers from misleading practices
                </li>
                <li>
                  <strong>Federal Truth in Lending Act:</strong> Ensuring transparency in financing terms
                </li>
                <li>
                  <strong>Equal Credit Opportunity Act:</strong> Prohibiting discrimination in credit decisions
                </li>
                <li>
                  <strong>Fair Credit Reporting Act:</strong> Protecting consumer credit information
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Bonding and Insurance</h2>
              <p>
                We maintain all required bonds and insurance as mandated by Texas law, including dealer surety bonds and
                comprehensive liability coverage to protect our customers and ensure financial responsibility.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Inspection and Safety Compliance</h2>
              <p>
                All vehicles sold by our dealership comply with Texas safety inspection requirements. We ensure that
                vehicles meet state emissions standards where applicable and provide required documentation.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Business Practices</h2>
              <p className="mb-4">Our business operates according to the following principles:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Transparent and honest advertising practices</li>
                <li>Full disclosure of vehicle history and condition</li>
                <li>Compliance with lemon law provisions</li>
                <li>Proper handling of title transfers and registration</li>
                <li>Ethical sales and financing practices</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Professional Affiliations</h2>
              <p className="mb-4">We maintain memberships and affiliations with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Texas Independent Automobile Dealers Association (TIADA)</li>
                <li>National Independent Automobile Dealers Association (NIADA)</li>
                <li>Better Business Bureau (BBB)</li>
                <li>Local Chamber of Commerce</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Regulatory Complaints</h2>
              <p className="mb-4">
                If you have concerns about our business practices or need to file a complaint, you may contact:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                <div>
                  <p className="font-semibold text-black">Texas Department of Motor Vehicles</p>
                  <p>Motor Vehicle Division</p>
                  <p>4000 Jackson Avenue</p>
                  <p>Austin, TX 78731</p>
                  <p>Phone: (888) 368-4689</p>
                  <p>Website: www.txdmv.gov</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Website Licensing</h2>
              <p>
                All content, images, logos, and materials on this website are protected by copyright and trademark laws.
                Unauthorized use, reproduction, or distribution of any content is strictly prohibited without express
                written permission from Car Junction LLC.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Contact Us</h2>
              <p className="mb-2">For questions about our licensing or regulatory compliance, please contact:</p>
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
