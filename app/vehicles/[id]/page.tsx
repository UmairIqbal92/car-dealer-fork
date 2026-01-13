"use client"

import type React from "react"
import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingActions from "@/components/floating-actions"
import { ArrowLeft, Phone, Mail, ChevronLeft, ChevronRight, MessageSquare, Car, X } from "lucide-react"

interface Vehicle {
  id: number
  name: string
  year: number
  price: number
  mileage: number
  color: string
  body_type: string
  fuel_type: string
  transmission: string
  drivetrain: string
  engine: string
  vin: string
  stock_number: string
  make: string
  model: string
  description: string
  features: string[]
  images: string[]
}

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)
  const [showInquiryModal, setShowInquiryModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })

  useEffect(() => {
    fetchVehicle()
  }, [id])

  const fetchVehicle = async () => {
    try {
      const res = await fetch(`/api/vehicles/${id}`)
      const data = await res.json()
      if (data.vehicle) {
        setVehicle(data.vehicle)
      }
    } catch (err) {
      console.error("Error fetching vehicle:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          vehicleId: parseInt(id),
          inquiryType: "vehicle"
        })
      })

      if (res.ok) {
        alert("Thank you for your inquiry! We'll contact you soon.")
        setShowInquiryModal(false)
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" })
      } else {
        alert("Failed to submit inquiry. Please try again.")
      }
    } catch (err) {
      console.error("Error submitting inquiry:", err)
      alert("An error occurred. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const nextImage = () => {
    if (vehicle?.images?.length) {
      setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length)
    }
  }

  const prevImage = () => {
    if (vehicle?.images?.length) {
      setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length)
    }
  }

  const handleEmailClick = () => {
    window.location.href = "mailto:cjunctionllc@gmail.com"
  }

  const handleCallClick = () => {
    window.location.href = "tel:2142156273"
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-40">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#EC3827] border-t-transparent"></div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!vehicle) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center py-40">
          <Car size={64} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-black mb-2">Vehicle Not Found</h2>
          <p className="text-gray-500 mb-6">This vehicle may no longer be available.</p>
          <button
            onClick={() => router.push("/vehicles")}
            className="bg-[#EC3827] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#d42f1f] transition-colors"
          >
            Browse All Vehicles
          </button>
        </div>
        <Footer />
      </main>
    )
  }

  const images = vehicle.images?.length ? vehicle.images : ["/placeholder-car.jpg"]

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <FloatingActions />

      <section className="py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-700 hover:text-[#EC3827] mb-6 font-semibold cursor-pointer transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Vehicles
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-72 sm:h-96 md:h-[500px] bg-gray-200 group">
                  {vehicle.images?.[0] ? (
                    <img
                      src={images[currentImageIndex]}
                      alt={`${vehicle.name} ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Car size={80} className="text-gray-400" />
                    </div>
                  )}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all cursor-pointer"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all cursor-pointer"
                      >
                        <ChevronRight size={24} />
                      </button>
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {images.length}
                      </div>
                    </>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-5 gap-2 p-4">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative h-16 sm:h-20 rounded-lg overflow-hidden cursor-pointer ${
                          currentImageIndex === index ? "ring-4 ring-[#EC3827]" : "ring-2 ring-gray-300"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {vehicle.description && (
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-black mb-4">Description</h2>
                  <p className="text-gray-700 leading-relaxed">{vehicle.description}</p>
                </div>
              )}

              {vehicle.features?.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-black mb-4">Features & Options</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {vehicle.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#EC3827] rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h1>
                <p className="text-4xl sm:text-5xl font-bold text-[#EC3827] mb-6">${vehicle.price?.toLocaleString()}</p>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-semibold">Mileage:</span>
                    <span className="text-black font-bold">{vehicle.mileage?.toLocaleString() || 0} mi</span>
                  </div>
                  {vehicle.body_type && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">Body Type:</span>
                      <span className="text-black font-bold">{vehicle.body_type}</span>
                    </div>
                  )}
                  {vehicle.color && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">Color:</span>
                      <span className="text-black font-bold">{vehicle.color}</span>
                    </div>
                  )}
                  {vehicle.transmission && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">Transmission:</span>
                      <span className="text-black font-bold">{vehicle.transmission}</span>
                    </div>
                  )}
                  {vehicle.fuel_type && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">Fuel Type:</span>
                      <span className="text-black font-bold">{vehicle.fuel_type}</span>
                    </div>
                  )}
                  {vehicle.drivetrain && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">Drivetrain:</span>
                      <span className="text-black font-bold">{vehicle.drivetrain}</span>
                    </div>
                  )}
                  {vehicle.engine && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">Engine:</span>
                      <span className="text-black font-bold">{vehicle.engine}</span>
                    </div>
                  )}
                  {vehicle.stock_number && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">Stock #:</span>
                      <span className="text-black font-bold">{vehicle.stock_number}</span>
                    </div>
                  )}
                  {vehicle.vin && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-semibold">VIN:</span>
                      <span className="text-black font-bold text-xs sm:text-sm">{vehicle.vin}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setShowInquiryModal(true)}
                    className="flex items-center justify-center gap-2 w-full bg-[#EC3827] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#d42f1f] transition-colors cursor-pointer"
                  >
                    <MessageSquare size={20} />
                    Inquire Now
                  </button>
                  
                  <button
                    onClick={handleCallClick}
                    className="flex items-center justify-center gap-2 w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <Phone size={18} />
                    (214) 215-6273
                  </button>
                  
                  <button
                    onClick={handleEmailClick}
                    className="flex items-center justify-center gap-2 w-full border-2 border-black text-black py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <Mail size={18} />
                    Email Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showInquiryModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-black">Request Information</h3>
                <p className="text-gray-500 text-sm mt-1">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </p>
              </div>
              <button
                onClick={() => setShowInquiryModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">
                    First Name <span className="text-[#EC3827]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">
                    Last Name <span className="text-[#EC3827]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  Email <span className="text-[#EC3827]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  Phone <span className="text-[#EC3827]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">Message</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={`I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model}...`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#EC3827] text-white py-3 rounded-lg font-bold hover:bg-[#d42f1f] transition-colors cursor-pointer disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Inquiry"}
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
