"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { MapPin, Phone, Clock } from "lucide-react"

export default function DealerPage() {
  const dealerInfo = {
    name: "Cars & Trucks Main Dealership",
    address: "2435 Glenda Ln Ste 4, Dallas, TX 75229",
    phone: "(+62)21-2002-2012",
    hours: "Mon - Sat: 09:00am - 06:00pm",
    email: "needhelp@company.com",
  }

  const inventoryItems = [
    {
      id: 1,
      make: "Toyota",
      model: "Camry",
      year: 2023,
      price: 28500,
      mileage: 12400,
      image: "/2023-toyota-camry.jpg",
    },
    {
      id: 2,
      make: "Honda",
      model: "Accord",
      year: 2022,
      price: 26900,
      mileage: 22100,
      image: "/2022-honda-accord.jpg",
    },
    {
      id: 3,
      make: "Ford",
      model: "F-150",
      year: 2023,
      price: 42300,
      mileage: 8900,
      image: "/2023-ford-f-150.jpg",
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Dealership</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Visit us today to explore our extensive inventory of quality used vehicles
          </p>
        </div>
      </section>

      {/* Dealer Information */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Visit Our Dealership</h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Our modern dealership facility is designed to provide you with a comfortable and professional car buying
                experience. Our knowledgeable staff is ready to help you find the perfect vehicle.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <MapPin className="text-red-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-bold text-black">{dealerInfo.name}</p>
                    <p className="text-gray-600 text-sm">{dealerInfo.address}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Phone className="text-red-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-bold text-black">Phone</p>
                    <p className="text-gray-600 text-sm">{dealerInfo.phone}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Clock className="text-red-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-bold text-black">Hours</p>
                    <p className="text-gray-600 text-sm">{dealerInfo.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border border-red-200">
              <h3 className="text-2xl font-bold text-black mb-6">Quick Contact</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Your message"
                  />
                </div>
                <button className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Inventory Listings */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center">Featured Inventory</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {inventoryItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={`${item.year} ${item.make} ${item.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-black mb-2">
                    {item.year} {item.make} {item.model}
                  </h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-red-600">${item.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-600">{item.mileage.toLocaleString()} mi</span>
                  </div>
                  <button className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
