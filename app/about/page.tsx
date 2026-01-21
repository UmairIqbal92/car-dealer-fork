import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingActions from "@/components/floating-actions"
import Link from "next/link"
import { MapPin } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <FloatingActions />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">About Us</h1>
          <p className="text-gray-300 text-lg">Learn more about Car Junction LLC</p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">About Car Junction LLC</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Car Junction LLC is your trusted partner for finding quality used cars and trucks at unbeatable prices
                in Dallas, TX. We are dedicated to providing you with the ultimate automobile buying experience. Our
                dealership is your #1 source for buying a quality pre-owned vehicle.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                We have extensive relationships in the dealer community allowing us to purchase a wide variety of lease
                returns and new car trades at exceptional values. This enables Car Junction LLC to pass along huge
                savings on the highest quality vehicles of your choice.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                In addition, we offer a full array of financing options to meet your needs. Our team is committed to
                making your car-buying experience smooth, transparent, and enjoyable. Visit us at our Dallas location
                today!
              </p>
            </div>
            <div>
              <img
                src="/images/img-home01-removebg-preview.png"
                alt="Red sports car"
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="bg-gray-50 py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
            <MapPin size={48} className="text-[#C74B3F] mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-black mb-6">Visit Our Dealership</h2>
            <p className="text-gray-700 text-xl mb-8 leading-relaxed">
              2435 Glenda Lane Ste 4
              <br />
              Dallas, Texas 75229
            </p>
            <p className="text-gray-700 text-lg mb-8">
              <span className="font-semibold">Business Hours:</span> Monday - Saturday, 9:00 AM - 7:00 PM | Sunday: Closed
            </p>
            <Link href="/contact">
              <button
                className="text-white px-10 py-4 rounded-lg font-bold hover:opacity-90 transition-all text-lg btn-hover-lift"
                style={{ backgroundColor: "#C74B3F" }}
              >
                Contact Us Today
              </button>
            </Link>
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
            <button
              className="text-white px-10 py-4 rounded-lg font-bold hover:opacity-90 transition-all text-lg btn-hover-lift"
              style={{ backgroundColor: "#C74B3F" }}
            >
              Apply Online
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
