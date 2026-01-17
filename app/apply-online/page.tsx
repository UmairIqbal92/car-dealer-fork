"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingActions from "@/components/floating-actions"
import { FileText, CheckCircle } from "lucide-react"

export default function ApplyOnlinePage() {
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [hasCoBuyer, setHasCoBuyer] = useState(false)
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

  const [buyerData, setBuyerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cellPhone: "",
    homePhone: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    timeAtAddress: "",
    monthlyRent: "",
    ssn: "",
    dateOfBirth: "",
    employerName: "",
    employerPhone: "",
    jobTitle: "",
    timeAtJob: "",
    monthlyGrossIncome: "",
  })

  const [coBuyerData, setCoBuyerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cellPhone: "",
    homePhone: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    timeAtAddress: "",
    monthlyRent: "",
    ssn: "",
    dateOfBirth: "",
    employerName: "",
    employerPhone: "",
    jobTitle: "",
    timeAtJob: "",
    monthlyGrossIncome: "",
  })

  const states = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ]

  const handleBuyerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setBuyerData(prev => ({ ...prev, [name]: value }))
  }

  const handleCoBuyerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCoBuyerData(prev => ({ ...prev, [name]: value }))
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
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerData,
          coBuyerData: hasCoBuyer ? coBuyerData : null,
        })
      })

      if (res.ok) {
        setSubmitted(true)
        generateCaptcha()
      } else {
        alert("Failed to submit application. Please try again.")
      }
    } catch (err) {
      console.error("Error submitting application:", err)
      alert("An error occurred. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <FloatingActions />
        
        <section className="py-20 px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} className="text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-black mb-4">Application Submitted!</h1>
              <p className="text-gray-600 mb-8">
                Thank you for submitting your credit application. Our team will review your information and contact you within 24-48 hours.
              </p>
              <a
                href="/vehicles"
                className="inline-block bg-[#C74B3F] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#b33f35] transition-colors"
              >
                Browse Vehicles
              </a>
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <FloatingActions />

      <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <FileText size={40} className="text-[#C74B3F]" />
            <h1 className="text-4xl md:text-5xl font-bold">Apply Online</h1>
          </div>
          <p className="text-gray-300 text-lg">Complete your credit application in minutes</p>
        </div>
      </section>

      <section className="py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-4 mb-10">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-[#C74B3F]" : "text-gray-400"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 1 ? "bg-[#C74B3F] text-white" : "bg-gray-200 text-gray-500"
              }`}>
                1
              </div>
              <span className="font-semibold hidden sm:inline">Buyer Info</span>
            </div>
            <div className="w-12 h-1 bg-gray-300 self-center">
              <div className={`h-full transition-all ${step >= 2 ? "bg-[#C74B3F] w-full" : "w-0"}`}></div>
            </div>
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-[#C74B3F]" : "text-gray-400"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 2 ? "bg-[#C74B3F] text-white" : "bg-gray-200 text-gray-500"
              }`}>
                2
              </div>
              <span className="font-semibold hidden sm:inline">Employment</span>
            </div>
            <div className="w-12 h-1 bg-gray-300 self-center">
              <div className={`h-full transition-all ${step >= 3 ? "bg-[#C74B3F] w-full" : "w-0"}`}></div>
            </div>
            <div className={`flex items-center gap-2 ${step >= 3 ? "text-[#C74B3F]" : "text-gray-400"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 3 ? "bg-[#C74B3F] text-white" : "bg-gray-200 text-gray-500"
              }`}>
                3
              </div>
              <span className="font-semibold hidden sm:inline">Review</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-black mb-6">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={buyerData.firstName}
                      onChange={handleBuyerChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={buyerData.lastName}
                      onChange={handleBuyerChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={buyerData.email}
                      onChange={handleBuyerChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Cell Phone *</label>
                    <input
                      type="tel"
                      name="cellPhone"
                      value={buyerData.cellPhone}
                      onChange={handleBuyerChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={buyerData.dateOfBirth}
                      onChange={handleBuyerChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Social Security # *</label>
                    <input
                      type="text"
                      name="ssn"
                      value={buyerData.ssn}
                      onChange={handleBuyerChange}
                      placeholder="XXX-XX-XXXX"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-black mb-4">Current Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-black mb-2">Street Address *</label>
                    <input
                      type="text"
                      name="streetAddress"
                      value={buyerData.streetAddress}
                      onChange={handleBuyerChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={buyerData.city}
                      onChange={handleBuyerChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">State *</label>
                      <select
                        name="state"
                        value={buyerData.state}
                        onChange={handleBuyerChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                      >
                        <option value="">Select</option>
                        {states.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">ZIP *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={buyerData.zipCode}
                        onChange={handleBuyerChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Time at Address</label>
                    <input
                      type="text"
                      name="timeAtAddress"
                      value={buyerData.timeAtAddress}
                      onChange={handleBuyerChange}
                      placeholder="e.g., 2 years"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Monthly Rent/Mortgage</label>
                    <input
                      type="text"
                      name="monthlyRent"
                      value={buyerData.monthlyRent}
                      onChange={handleBuyerChange}
                      placeholder="$"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-[#C74B3F] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#b33f35] transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-black mb-6">Employment Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-black mb-2">Employer Name *</label>
                    <input
                      type="text"
                      name="employerName"
                      value={buyerData.employerName}
                      onChange={handleBuyerChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Employer Phone</label>
                    <input
                      type="tel"
                      name="employerPhone"
                      value={buyerData.employerPhone}
                      onChange={handleBuyerChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Job Title *</label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={buyerData.jobTitle}
                      onChange={handleBuyerChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Time at Job</label>
                    <input
                      type="text"
                      name="timeAtJob"
                      value={buyerData.timeAtJob}
                      onChange={handleBuyerChange}
                      placeholder="e.g., 3 years"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Monthly Gross Income *</label>
                    <input
                      type="text"
                      name="monthlyGrossIncome"
                      value={buyerData.monthlyGrossIncome}
                      onChange={handleBuyerChange}
                      placeholder="$"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <input
                      type="checkbox"
                      id="hasCoBuyer"
                      checked={hasCoBuyer}
                      onChange={(e) => setHasCoBuyer(e.target.checked)}
                      className="w-5 h-5 accent-[#C74B3F]"
                    />
                    <label htmlFor="hasCoBuyer" className="text-black font-semibold">Add a Co-Buyer</label>
                  </div>
                </div>

                {hasCoBuyer && (
                  <div className="bg-gray-50 p-6 rounded-xl mb-6">
                    <h3 className="text-lg font-bold text-black mb-4">Co-Buyer Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={coBuyerData.firstName}
                          onChange={handleCoBuyerChange}
                          required={hasCoBuyer}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={coBuyerData.lastName}
                          onChange={handleCoBuyerChange}
                          required={hasCoBuyer}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={coBuyerData.email}
                          onChange={handleCoBuyerChange}
                          required={hasCoBuyer}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-black mb-2">Cell Phone *</label>
                        <input
                          type="tel"
                          name="cellPhone"
                          value={coBuyerData.cellPhone}
                          onChange={handleCoBuyerChange}
                          required={hasCoBuyer}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="border-2 border-gray-300 text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="bg-[#C74B3F] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#b33f35] transition-colors"
                  >
                    Review Application
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-black mb-6">Review Your Application</h2>
                
                <div className="bg-gray-50 p-6 rounded-xl mb-6">
                  <h3 className="text-lg font-bold text-black mb-4">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Name:</span>
                      <p className="font-semibold text-black">{buyerData.firstName} {buyerData.lastName}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <p className="font-semibold text-black">{buyerData.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Phone:</span>
                      <p className="font-semibold text-black">{buyerData.cellPhone}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Address:</span>
                      <p className="font-semibold text-black">{buyerData.streetAddress}, {buyerData.city}, {buyerData.state} {buyerData.zipCode}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl mb-6">
                  <h3 className="text-lg font-bold text-black mb-4">Employment Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Employer:</span>
                      <p className="font-semibold text-black">{buyerData.employerName}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Job Title:</span>
                      <p className="font-semibold text-black">{buyerData.jobTitle}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Monthly Income:</span>
                      <p className="font-semibold text-black">${buyerData.monthlyGrossIncome}</p>
                    </div>
                  </div>
                </div>

                {hasCoBuyer && (
                  <div className="bg-gray-50 p-6 rounded-xl mb-6">
                    <h3 className="text-lg font-bold text-black mb-4">Co-Buyer Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Name:</span>
                        <p className="font-semibold text-black">{coBuyerData.firstName} {coBuyerData.lastName}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Email:</span>
                        <p className="font-semibold text-black">{coBuyerData.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
                  <p className="text-sm text-yellow-800">
                    By submitting this application, you authorize Car Junction LLC to obtain credit reports and verify the information provided.
                  </p>
                </div>

                <div className="bg-[#FFF5F4] border-2 border-[#C74B3F] p-4 rounded-lg mb-6">
                  <label className="block text-base font-bold text-[#C74B3F] mb-2">
                    Security Check: What is {captcha.num1} + {captcha.num2}? *
                  </label>
                  <input
                    type="number"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    placeholder="Enter your answer"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-black text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                    required
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="border-2 border-gray-300 text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#C74B3F] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#b33f35] transition-colors disabled:opacity-50"
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
