"use client"

import type React from "react"
import { useState } from "react"

export default function CarFinderForm() {
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
    console.log("Form submitted:", formData)
  }

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1300px] mx-auto">
        {/* Heading ABOVE everything */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-3">
            Don't see what you're looking for?
          </h2>
          <p className="text-gray-600 text-base">We can help you find it! Fill out the form below.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left side - Image (50%) - BIGGER/PROMINENT */}
            <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-12">
              <img
                src="/images/form-image1.png"
                alt="Car"
                className="w-full h-auto object-contain max-h-[450px] drop-shadow-2xl"
              />
            </div>

            {/* Right side - Form (50%) - WIDER layout, LESS vertical */}
            <div className="p-6 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Vehicle Information - 2 columns COMPACT */}
                <div>
                  <h3 className="text-sm font-bold text-black mb-3 uppercase tracking-wide">Vehicle Info</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-black mb-1.5">Make *</label>
                      <select
                        name="make"
                        value={formData.make}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        <option value="">Select</option>
                        {makes.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-black mb-1.5">Model *</label>
                      <select
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        <option value="">Select</option>
                        {models.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-black mb-1.5">Year *</label>
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        <option value="">Select</option>
                        {years.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-black mb-1.5">Max Mileage *</label>
                      <input
                        type="number"
                        name="maxMileage"
                        value={formData.maxMileage}
                        onChange={handleChange}
                        placeholder="100000"
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-black mb-1.5">Price Range *</label>
                      <select
                        name="priceRange"
                        value={formData.priceRange}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        <option value="">Select</option>
                        <option value="0-10000">$0 - $10,000</option>
                        <option value="10000-20000">$10,000 - $20,000</option>
                        <option value="20000-30000">$20,000 - $30,000</option>
                        <option value="30000+">$30,000+</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Features - full width textarea COMPACT */}
                <div>
                  <label className="block text-xs font-semibold text-black mb-1.5">Desired Features</label>
                  <textarea
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    placeholder="Any specific features..."
                    rows={2}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
                  />
                </div>

                {/* Contact Information - 2 columns COMPACT */}
                <div>
                  <h3 className="text-sm font-bold text-black mb-3 uppercase tracking-wide">Contact Info</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-black mb-1.5">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-black mb-1.5">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-black mb-1.5">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-black mb-1.5">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms - COMPACT */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    required
                    className="w-4 h-4 accent-red-600 cursor-pointer"
                  />
                  <label className="text-xs text-gray-700">I agree to all your terms and policies</label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white px-6 py-3.5 rounded-lg font-bold hover:bg-red-700 transition-colors text-sm shadow-lg hover:shadow-xl"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
