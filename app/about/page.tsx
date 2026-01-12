import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { Phone, Mail } from "lucide-react"

export default function AboutPage() {
  const team = [
    {
      name: "John Doe",
      position: "General Manager",
      phone: "(888) 111-1111",
      email: "test@dealercenter.com",
    },
    {
      name: "Mike Doe",
      position: "Sales Representative",
      phone: "(888) 111-1111",
      email: "test@dealercenter.com",
    },
    {
      name: "Michael Doe",
      position: "Owner",
      phone: "(888) 111-1111",
      email: "test@dealercenter.com",
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <div className="flex items-center gap-2 text-lg">
            <Link href="/" className="hover:text-red-600 transition-colors">
              Home
            </Link>
            <span className="text-red-600">•</span>
            <span>About Us</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">About Cars & Trucks Dealership</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Our Dealership is dedicated to providing you with the ultimate automobile buying experience. Our
                Dealership is your #1 source for buying a quality pre-owned vehicle. We have extensive relationships in
                the dealer community allowing us to purchase a wide variety of lease returns and new car trades at
                exceptional values.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                This enables Our Dealership to pass along huge savings on the highest quality vehicles of your choice.
                In addition, we offer a full array of financing options to meet your needs. Our team is committed to
                making your car-buying experience smooth, transparent, and enjoyable.
              </p>
            </div>
            <div>
              <img
                src="/images/img-home01-removebg-preview.png"
                alt="Red car"
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Meet Our Team</h2>
            <p className="text-gray-700 text-lg">Dedicated professionals ready to help you find your perfect vehicle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-black mb-2">{member.name}</h3>
                <p className="text-red-600 font-semibold mb-4">{member.position}</p>

                <div className="space-y-3 text-left">
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <Phone size={18} className="text-red-600" />
                    <span>{member.phone}</span>
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-3 text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <Mail size={18} className="text-red-600" />
                    <span className="break-all">{member.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finance CTA Section */}
      <section className="bg-black text-white py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">WE CAN GET YOU FINANCED</h2>
          <p className="text-xl text-gray-300 mb-8">
            Good Credit, Bad Credit, First Time Buyer? Our lenders work with all types of scores and situations.
          </p>
          <Link href="/apply">
            <button className="bg-red-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors text-lg">
              Apply Online
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
