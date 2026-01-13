"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingActions from "@/components/floating-actions"
import Captcha from "@/components/captcha"
import AdvancedSelect from "@/components/advanced-select"
import { Search } from "lucide-react"

export default function CarFinderPage() {
  const [isCaptchaValid, setIsCaptchaValid] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    maxMileage: "",
    priceRange: "",
    features: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    terms: false,
  })

  const makes = ["Ford", "Chevrolet", "Toyota", "Honda", "Nissan", "RAM", "GMC", "Jeep", "BMW", "Mercedes-Benz"]
  const models = ["F-150", "Silverado", "Camry", "Accord", "Altima", "Tacoma", "CR-V", "Civic", "3 Series", "C-Class"]
  const years = Array.from({ length: 36 }, (_, i) => 2025 - i)
  const priceRanges = [
    "$0 - $10,000",
    "$10,000 - $20,000",
    "$20,000 - $30,000",
    "$30,000 - $40,000",
    "$40,000 - $50,000",
    "$50,000+",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isCaptchaValid) {
      alert("Please complete the security check correctly.")
      return
    }
    
    setSubmitting(true)

    try {
      const priceMatch = formData.priceRange.match(/\$?([\d,]+)/g)
      let priceMin = ""
      let priceMax = ""
      if (priceMatch) {
        priceMin = priceMatch[0]?.replace(/[$,]/g, '') || ""
        priceMax = priceMatch[1]?.replace(/[$,]/g, '') || ""
      }

      const res = await fetch("/api/car-finder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          make: formData.make,
          model: formData.model,
          yearMin: formData.year,
          yearMax: formData.year,
          priceMin,
          priceMax,
          message: `Max Mileage: ${formData.maxMileage || 'Any'}\nDesired Features: ${formData.features || 'None specified'}`
        })
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        alert("Failed to submit request. Please try again.")
      }
    } catch (err) {
      console.error("Error submitting request:", err)
      alert("An error occurred. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <FloatingActions />
        
        <section className="py-20 px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={48} className="text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-black mb-4">Request Submitted!</h1>
              <p className="text-gray-600 mb-8">
                Thank you for your car finder request. Our team will search for matching vehicles and contact you soon.
              </p>
              <a
                href="/vehicles"
                className="inline-block bg-[#EC3827] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#d42f1f] transition-colors"
              >
                Browse Current Inventory
              </a>
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <FloatingActions />

      <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Find Your Perfect Car</h1>
          <p className="text-gray-300 text-lg">Tell us what you're looking for and we'll help you find it</p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative min-h-[400px] lg:min-h-full bg-gray-100">
                <img
                  src="/images/white-truck.jpg"
                  alt="White Truck"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center p-12">
                  <div className="text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Let Us Find It For You</h2>
                    <p className="text-lg">Fill out the form and our team will reach out with matching vehicles</p>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-black mb-6 pb-3 border-b-2 border-[#EC3827]">
                      VEHICLE PREFERENCES
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Make *</label>
                        <AdvancedSelect
                          options={makes}
                          value={formData.make}
                          onChange={(val) => handleSelectChange("make", val)}
                          placeholder="Select Make"
                          name="make"
                          required={true}
                          searchable={true}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Model *</label>
                        <AdvancedSelect
                          options={models}
                          value={formData.model}
                          onChange={(val) => handleSelectChange("model", val)}
                          placeholder="Select Model"
                          name="model"
                          required={true}
                          searchable={true}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Year *</label>
                        <AdvancedSelect
                          options={years}
                          value={formData.year}
                          onChange={(val) => handleSelectChange("year", val)}
                          placeholder="Select Year"
                          name="year"
                          required={true}
                          searchable={true}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Max Mileage *</label>
                        <input
                          type="number"
                          name="maxMileage"
                          value={formData.maxMileage}
                          onChange={handleChange}
                          placeholder="e.g., 50000"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Price Range *</label>
                        <AdvancedSelect
                          options={priceRanges}
                          value={formData.priceRange}
                          onChange={(val) => handleSelectChange("priceRange", val)}
                          placeholder="Select Price Range"
                          name="priceRange"
                          required={true}
                          searchable={false}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Desired Features</label>
                        <textarea
                          name="features"
                          value={formData.features}
                          onChange={handleChange}
                          placeholder="e.g., Leather seats, Sunroof, Navigation..."
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-black mb-6 pb-3 border-b-2 border-[#EC3827]">
                      CONTACT INFORMATION
                    </h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-black mb-2">First Name *</label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-black mb-2">Last Name *</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                        />
                      </div>
                    </div>
                  </div>

                  <Captcha onVerify={setIsCaptchaValid} />

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                      required
                      className="w-5 h-5 mt-1 cursor-pointer"
                      style={{ accentColor: "#EC3827" }}
                    />
                    <span className="text-sm text-gray-700 leading-relaxed">
                      I agree to the terms and policies and consent to be contacted by Car Junction LLC
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!isCaptchaValid || submitting}
                    className="w-full text-white px-8 py-4 rounded-lg font-bold hover:opacity-90 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#EC3827" }}
                  >
                    {submitting ? "SUBMITTING..." : "SUBMIT REQUEST"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
