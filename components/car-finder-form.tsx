"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Search } from "lucide-react"

export default function CarFinderForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    yearMin: "",
    yearMax: "",
    maxMileage: "",
    priceMin: "",
    priceMax: "",
    features: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    terms: false,
  })
  const [captchaAnswer, setCaptchaAnswer] = useState("")
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: 0 })

  useEffect(() => {
    generateCaptcha()
  }, [])

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 8) + 2
    const num2 = Math.floor(Math.random() * 8) + 1
    setCaptcha({ num1, num2, answer: num1 + num2 })
    setCaptchaAnswer("")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (parseInt(captchaAnswer) !== captcha.answer) {
      alert("Incorrect answer. Please try again.")
      generateCaptcha()
      return
    }

    setSubmitting(true)

    try {
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
          yearMin: formData.yearMin,
          yearMax: formData.yearMax,
          priceMin: formData.priceMin,
          priceMax: formData.priceMax,
          message: `Max Mileage: ${formData.maxMileage || 'Any'}\nFeatures: ${formData.features || 'None specified'}`
        })
      })

      if (res.ok) {
        setSubmitted(true)
        generateCaptcha()
      } else {
        alert("Failed to submit request. Please try again.")
      }
    } catch (err) {
      console.error("Error submitting car finder:", err)
      alert("An error occurred. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1300px] mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-black mb-2">Request Submitted!</h2>
            <p className="text-gray-600 mb-6">We'll start searching for your perfect car right away and contact you soon.</p>
            <button
              onClick={() => {
                setSubmitted(false)
                setFormData({
                  make: "",
                  model: "",
                  yearMin: "",
                  yearMax: "",
                  maxMileage: "",
                  priceMin: "",
                  priceMax: "",
                  features: "",
                  firstName: "",
                  lastName: "",
                  phone: "",
                  email: "",
                  terms: false,
                })
              }}
              className="text-[#C74B3F] font-semibold hover:underline"
            >
              Submit another request
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-3">
            Don't see what you're looking for?
          </h2>
          <p className="text-gray-600 text-base">We can help you find it! Fill out the form below.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-12">
              <img
                src="/images/form-image1.png"
                alt="Car"
                className="w-full h-auto object-contain max-h-[450px] drop-shadow-2xl"
              />
            </div>

            <div className="p-6 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-black mb-3 uppercase tracking-wide">Vehicle Info</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-black mb-1.5">Make *</label>
                      <input
                        type="text"
                        name="make"
                        value={formData.make}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Toyota"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-black mb-1.5">Model *</label>
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Camry"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-black mb-1.5">Year From</label>
                      <input
                        type="text"
                        name="yearMin"
                        value={formData.yearMin}
                        onChange={handleChange}
                        placeholder="e.g. 2020"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-black mb-1.5">Max Mileage</label>
                      <input
                        type="number"
                        name="maxMileage"
                        value={formData.maxMileage}
                        onChange={handleChange}
                        placeholder="100000"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-black mb-1.5">Min Price</label>
                      <input
                        type="number"
                        name="priceMin"
                        value={formData.priceMin}
                        onChange={handleChange}
                        placeholder="$0"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-black mb-1.5">Max Price</label>
                      <input
                        type="number"
                        name="priceMax"
                        value={formData.priceMax}
                        onChange={handleChange}
                        placeholder="Any"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                  </div>
                </div>

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

                <div className="bg-[#FFF5F4] border-2 border-[#C74B3F] p-3 rounded-lg">
                  <label className="block text-sm font-bold text-[#C74B3F] mb-2">
                    Security Check: What is {captcha.num1} + {captcha.num2}? *
                  </label>
                  <input
                    type="number"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    placeholder="Enter your answer"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-black text-base font-semibold focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                </div>

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

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-red-600 text-white px-6 py-3.5 rounded-lg font-bold hover:bg-red-700 transition-colors text-sm shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {submitting ? "SUBMITTING..." : "SUBMIT"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
