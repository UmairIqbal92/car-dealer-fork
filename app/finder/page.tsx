"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CarFinderPage() {
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
    comments: "",
    terms: false,
  })

  const makes = ["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Audi", "Chevrolet", "Nissan"]
  const models = ["Camry", "Accord", "F-150", "3 Series", "C-Class", "A4", "Silverado", "Altima"]
  const years = Array.from({ length: 30 }, (_, i) => 2024 - i)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Car Finder form submitted:", formData)
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-black text-white py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Find Your Car</h1>
          <p className="text-gray-300">Fill out the form below and let us help you find your perfect vehicle</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-10 md:p-14">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Vehicle Preferences */}
              <div>
                <h2 className="text-2xl font-bold text-black mb-8 pb-4 border-b-2 border-red-600">
                  Vehicle Preferences
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Make *</label>
                    <select
                      name="make"
                      value={formData.make}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option value="">Select Make</option>
                      {makes.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Model *</label>
                    <select
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option value="">Select Model</option>
                      {models.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Year *</label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option value="">Select Year</option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Max Mileage *</label>
                    <input
                      type="number"
                      name="maxMileage"
                      value={formData.maxMileage}
                      onChange={handleChange}
                      placeholder="100000"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Price Range *</label>
                    <select
                      name="priceRange"
                      value={formData.priceRange}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option value="">Select Range</option>
                      <option value="0-10000">$0 - $10,000</option>
                      <option value="10000-20000">$10,000 - $20,000</option>
                      <option value="20000-30000">$20,000 - $30,000</option>
                      <option value="30000+">$30,000+</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-black mb-2">Desired Features</label>
                  <textarea
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    placeholder="Describe any specific features you're looking for (leather interior, sunroof, backup camera, etc.)"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-black mb-8 pb-4 border-b-2 border-red-600">
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-black mb-2">Additional Comments</label>
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Let us know anything else that might help us find the perfect car for you..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>

              {/* Terms */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    required
                    className="w-5 h-5 accent-red-600 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to all your terms and policies and authorize Cars & Trucks to contact me
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-red-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-red-700 transition-colors text-lg"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
