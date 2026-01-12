"use client"

import type React from "react"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { useState } from "react"

export default function ApplyOnlinePage() {
  const [activeTab, setActiveTab] = useState<"buyer" | "cobuy">("buyer")
  const [buyerFormData, setBuyerFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cellPhone: "",
    homePhone: "",
    dateOfBirth: "",
    ssn: "",
    driversLicenseNumber: "",
    driversLicenseState: "",
    driversLicenseIssueDate: "",
    driversLicenseExpiryDate: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    housingType: "",
    monthlyRent: "",
    yearsAtAddress: "",
    monthsAtAddress: "",
    employerName: "",
    employerTitle: "",
    employerPhone: "",
    monthlyGrossIncome: "",
    yearsAtJob: "",
    monthsAtJob: "",
    vehicleKeyword: "",
    stockNumber: "",
    year: "",
    make: "",
    model: "",
    vehiclePrice: "",
    downPayment: "",
    exteriorColor: "",
    interiorColor: "",
    acceptTerms: false,
    addPreviousAddress: false,
    addPreviousEmployment: false,
    addTradeIn: false,
  })

  const [coBuyerFormData, setCoBuyerFormData] = useState({
    hasCoBuyer: false,
    relationshipToBuyer: "",
    firstName: "",
    lastName: "",
    email: "",
    cellPhone: "",
    homePhone: "",
    dateOfBirth: "",
    ssn: "",
    driversLicenseNumber: "",
    driversLicenseState: "",
    driversLicenseIssueDate: "",
    driversLicenseExpiryDate: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    housingType: "",
    monthlyRent: "",
    yearsAtAddress: "",
    monthsAtAddress: "",
    employerName: "",
    employerTitle: "",
    employerPhone: "",
    monthlyGrossIncome: "",
    yearsAtJob: "",
    monthsAtJob: "",
    acceptTerms: false,
    addPreviousAddress: false,
    addPreviousEmployment: false,
  })

  const handleBuyerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const finalValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    setBuyerFormData((prev) => ({ ...prev, [name]: finalValue }))
  }

  const handleCoBuyerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const finalValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    setCoBuyerFormData((prev) => ({ ...prev, [name]: finalValue }))
  }

  const handleBuyerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Buyer form submitted:", buyerFormData)
  }

  const handleCoBuyerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Co-buyer form submitted:", coBuyerFormData)
  }

  const usStates = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ]

  const yearsArray = Array.from({ length: 101 }, (_, i) => i)
  const monthsArray = Array.from({ length: 12 }, (_, i) => i)

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Apply Online</h1>
          <div className="flex items-center gap-2 text-lg">
            <Link href="/" className="hover:text-red-600 transition-colors">
              Home
            </Link>
            <span className="text-red-600">•</span>
            <span>Apply Online</span>
          </div>
        </div>
      </section>

      {/* Apply Form Section */}
      <section className="py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-4 mb-12 border-b border-gray-300">
            <button
              onClick={() => setActiveTab("buyer")}
              className={`px-6 py-4 font-semibold text-lg transition-colors ${
                activeTab === "buyer" ? "text-red-600 border-b-2 border-red-600" : "text-gray-600 hover:text-black"
              }`}
            >
              Buyer
            </button>
            <button
              onClick={() => setActiveTab("cobuy")}
              className={`px-6 py-4 font-semibold text-lg transition-colors ${
                activeTab === "cobuy" ? "text-red-600 border-b-2 border-red-600" : "text-gray-600 hover:text-black"
              }`}
            >
              Co-Buyer
            </button>
          </div>

          {/* Buyer Form */}
          {activeTab === "buyer" && (
            <form onSubmit={handleBuyerSubmit} className="space-y-10">
              {/* Personal Information */}
              <div>
                <h3 className="text-2xl font-bold text-black mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name *"
                    value={buyerFormData.firstName}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name *"
                    value={buyerFormData.lastName}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={buyerFormData.email}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                  <input
                    type="tel"
                    name="cellPhone"
                    placeholder="Cell Phone *"
                    value={buyerFormData.cellPhone}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                  <input
                    type="tel"
                    name="homePhone"
                    placeholder="Home Phone (Optional)"
                    value={buyerFormData.homePhone}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <input
                    type="date"
                    name="dateOfBirth"
                    placeholder="Date of Birth *"
                    value={buyerFormData.dateOfBirth}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                  <input
                    type="text"
                    name="ssn"
                    placeholder="SSN (###-##-####) *"
                    value={buyerFormData.ssn}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                  <input
                    type="text"
                    name="driversLicenseNumber"
                    placeholder="Driver's License Number"
                    value={buyerFormData.driversLicenseNumber}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <select
                    name="driversLicenseState"
                    value={buyerFormData.driversLicenseState}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <option value="">Driver's License State</option>
                    {usStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    name="driversLicenseIssueDate"
                    placeholder="Issue Date"
                    value={buyerFormData.driversLicenseIssueDate}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <input
                    type="date"
                    name="driversLicenseExpiryDate"
                    placeholder="Expiry Date"
                    value={buyerFormData.driversLicenseExpiryDate}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>

              {/* Residential Information */}
              <div>
                <h3 className="text-2xl font-bold text-black mb-6">Residential Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="streetAddress"
                    placeholder="Street Address *"
                    value={buyerFormData.streetAddress}
                    onChange={handleBuyerChange}
                    className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City *"
                    value={buyerFormData.city}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                  <select
                    name="state"
                    value={buyerFormData.state}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  >
                    <option value="">State *</option>
                    {usStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code *"
                    value={buyerFormData.zipCode}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                  <select
                    name="housingType"
                    value={buyerFormData.housingType}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  >
                    <option value="">Housing Type *</option>
                    <option value="rent">Rent</option>
                    <option value="own">Own</option>
                    <option value="other">Other</option>
                  </select>
                  <input
                    type="number"
                    name="monthlyRent"
                    placeholder="Monthly Rent/Mortgage Amount *"
                    value={buyerFormData.monthlyRent}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                  <div className="flex gap-4">
                    <select
                      name="yearsAtAddress"
                      value={buyerFormData.yearsAtAddress}
                      onChange={handleBuyerChange}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    >
                      <option value="">Years *</option>
                      {yearsArray.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <select
                      name="monthsAtAddress"
                      value={buyerFormData.monthsAtAddress}
                      onChange={handleBuyerChange}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option value="">Months</option>
                      {monthsArray.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <label className="flex items-center gap-3 mt-6 text-black font-semibold">
                  <input
                    type="checkbox"
                    name="addPreviousAddress"
                    checked={buyerFormData.addPreviousAddress}
                    onChange={handleBuyerChange}
                    className="w-5 h-5 rounded"
                  />
                  Add Previous Address
                </label>
              </div>

              {/* Employment Information */}
              <div>
                <h3 className="text-2xl font-bold text-black mb-6">Employment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="employerName"
                    placeholder="Employer Name *"
                    value={buyerFormData.employerName}
                    onChange={handleBuyerChange}
                    className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                  <input
                    type="text"
                    name="employerTitle"
                    placeholder="Title/Position *"
                    value={buyerFormData.employerTitle}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                  <input
                    type="tel"
                    name="employerPhone"
                    placeholder="Employer Phone Number *"
                    value={buyerFormData.employerPhone}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                  <input
                    type="number"
                    name="monthlyGrossIncome"
                    placeholder="Monthly Gross Income *"
                    value={buyerFormData.monthlyGrossIncome}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                    required
                  />
                  <div className="flex gap-4">
                    <select
                      name="yearsAtJob"
                      value={buyerFormData.yearsAtJob}
                      onChange={handleBuyerChange}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    >
                      <option value="">Years *</option>
                      {yearsArray.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <select
                      name="monthsAtJob"
                      value={buyerFormData.monthsAtJob}
                      onChange={handleBuyerChange}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option value="">Months</option>
                      {monthsArray.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <label className="flex items-center gap-3 mt-6 text-black font-semibold">
                  <input
                    type="checkbox"
                    name="addPreviousEmployment"
                    checked={buyerFormData.addPreviousEmployment}
                    onChange={handleBuyerChange}
                    className="w-5 h-5 rounded"
                  />
                  Add Previous Employment
                </label>
              </div>

              {/* Interested Vehicle */}
              <div>
                <h3 className="text-2xl font-bold text-black mb-6">Interested Vehicle</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="vehicleKeyword"
                    placeholder="Vehicle Keyword (search box)"
                    value={buyerFormData.vehicleKeyword}
                    onChange={handleBuyerChange}
                    className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <input
                    type="text"
                    name="stockNumber"
                    placeholder="Stock Number"
                    value={buyerFormData.stockNumber}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <input
                    type="number"
                    name="year"
                    placeholder="Year"
                    value={buyerFormData.year}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <input
                    type="text"
                    name="make"
                    placeholder="Make"
                    value={buyerFormData.make}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <input
                    type="text"
                    name="model"
                    placeholder="Model"
                    value={buyerFormData.model}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <input
                    type="number"
                    name="vehiclePrice"
                    placeholder="Vehicle Price"
                    value={buyerFormData.vehiclePrice}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <input
                    type="number"
                    name="downPayment"
                    placeholder="Down Payment"
                    value={buyerFormData.downPayment}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <input
                    type="text"
                    name="exteriorColor"
                    placeholder="Exterior Color"
                    value={buyerFormData.exteriorColor}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <input
                    type="text"
                    name="interiorColor"
                    placeholder="Interior Color"
                    value={buyerFormData.interiorColor}
                    onChange={handleBuyerChange}
                    className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <label className="flex items-center gap-3 mt-6 text-black font-semibold">
                  <input
                    type="checkbox"
                    name="addTradeIn"
                    checked={buyerFormData.addTradeIn}
                    onChange={handleBuyerChange}
                    className="w-5 h-5 rounded"
                  />
                  Add Trade-in?
                </label>
              </div>

              {/* Terms */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-sm text-gray-700 mb-4">
                  I accept all the above terms and conditions. By submitting this application, you authorize us to
                  obtain credit reports and verify employment information.
                </p>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={buyerFormData.acceptTerms}
                    onChange={handleBuyerChange}
                    className="w-5 h-5 rounded accent-red-600"
                    required
                  />
                  <span className="text-black font-semibold">I accept all the above terms</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors text-lg"
              >
                SUBMIT
              </button>
            </form>
          )}

          {/* Co-Buyer Form */}
          {activeTab === "cobuy" && (
            <form onSubmit={handleCoBuyerSubmit} className="space-y-10">
              {/* Co-Buyer Toggle */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="hasCoBuyer"
                    checked={coBuyerFormData.hasCoBuyer}
                    onChange={handleCoBuyerChange}
                    className="w-5 h-5 rounded accent-red-600"
                  />
                  <span className="text-black font-semibold">Has Co-Buyer?</span>
                </label>
              </div>

              {coBuyerFormData.hasCoBuyer && (
                <>
                  {/* Relationship */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Relationship to Buyer *</label>
                    <select
                      name="relationshipToBuyer"
                      value={coBuyerFormData.relationshipToBuyer}
                      onChange={handleCoBuyerChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    >
                      <option value="">Select Relationship</option>
                      <option value="spouse">Spouse</option>
                      <option value="parent">Parent</option>
                      <option value="sibling">Sibling</option>
                      <option value="friend">Friend</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Personal Information */}
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-6">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name *"
                        value={coBuyerFormData.firstName}
                        onChange={handleCoBuyerChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name *"
                        value={coBuyerFormData.lastName}
                        onChange={handleCoBuyerChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        value={coBuyerFormData.email}
                        onChange={handleCoBuyerChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                      <input
                        type="tel"
                        name="cellPhone"
                        placeholder="Cell Phone *"
                        value={coBuyerFormData.cellPhone}
                        onChange={handleCoBuyerChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                      <input
                        type="tel"
                        name="homePhone"
                        placeholder="Home Phone (Optional)"
                        value={coBuyerFormData.homePhone}
                        onChange={handleCoBuyerChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                      <input
                        type="date"
                        name="dateOfBirth"
                        placeholder="Date of Birth *"
                        value={coBuyerFormData.dateOfBirth}
                        onChange={handleCoBuyerChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                      <input
                        type="text"
                        name="ssn"
                        placeholder="SSN (###-##-####) *"
                        value={coBuyerFormData.ssn}
                        onChange={handleCoBuyerChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                      <input
                        type="text"
                        name="driversLicenseNumber"
                        placeholder="Driver's License Number"
                        value={coBuyerFormData.driversLicenseNumber}
                        onChange={handleCoBuyerChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                      <select
                        name="driversLicenseState"
                        value={coBuyerFormData.driversLicenseState}
                        onChange={handleCoBuyerChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        <option value="">Driver's License State</option>
                        {usStates.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      <input
                        type="date"
                        name="driversLicenseIssueDate"
                        placeholder="Issue Date"
                        value={coBuyerFormData.driversLicenseIssueDate}
                        onChange={handleCoBuyerChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                      <input
                        type="date"
                        name="driversLicenseExpiryDate"
                        placeholder="Expiry Date"
                        value={coBuyerFormData.driversLicenseExpiryDate}
                        onChange={handleCoBuyerChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                  </div>

                  {/* Residential Information */}
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-6">Residential Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        type="text"
                        name="streetAddress"
                        placeholder="Street Address *"
                        value={coBuyerFormData.streetAddress}
                        onChange={handleCoBuyerChange}
                        className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                      <input
                        type="text"
                        name="city"
                        placeholder="City *"
                        value={coBuyerFormData.city}
                        onChange={handleCoBuyerChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                      <select
                        name="state"
                        value={coBuyerFormData.state}
                        onChange={handleCoBuyerChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      >
                        <option value="">State *</option>
                        {usStates.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="Zip Code *"
                        value={coBuyerFormData.zipCode}
                        onChange={handleCoBuyerChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                      <select
                        name="housingType"
                        value={coBuyerFormData.housingType}
                        onChange={handleCoBuyerChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      >
                        <option value="">Housing Type *</option>
                        <option value="rent">Rent</option>
                        <option value="own">Own</option>
                        <option value="other">Other</option>
                      </select>
                      <input
                        type="number"
                        name="monthlyRent"
                        placeholder="Monthly Rent/Mortgage Amount *"
                        value={coBuyerFormData.monthlyRent}
                        onChange={handleCoBuyerChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                      <div className="flex gap-4">
                        <select
                          name="yearsAtAddress"
                          value={coBuyerFormData.yearsAtAddress}
                          onChange={handleCoBuyerChange}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                          required
                        >
                          <option value="">Years *</option>
                          {yearsArray.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                        <select
                          name="monthsAtAddress"
                          value={coBuyerFormData.monthsAtAddress}
                          onChange={handleCoBuyerChange}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                        >
                          <option value="">Months</option>
                          {monthsArray.map((month) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <label className="flex items-center gap-3 mt-6 text-black font-semibold">
                      <input
                        type="checkbox"
                        name="addPreviousAddress"
                        checked={coBuyerFormData.addPreviousAddress}
                        onChange={handleCoBuyerChange}
                        className="w-5 h-5 rounded"
                      />
                      Add Previous Address
                    </label>
                  </div>

                  {/* Employment Information */}
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-6">Employment Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        type="text"
                        name="employerName"
                        placeholder="Employer Name *"
                        value={coBuyerFormData.employerName}
                        onChange={handleCoBuyerChange}
                        className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                      <input
                        type="text"
                        name="employerTitle"
                        placeholder="Title/Position *"
                        value={coBuyerFormData.employerTitle}
                        onChange={handleCoBuyerChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                      <input
                        type="tel"
                        name="employerPhone"
                        placeholder="Employer Phone Number *"
                        value={coBuyerFormData.employerPhone}
                        onChange={handleCoBuyerChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                      <input
                        type="number"
                        name="monthlyGrossIncome"
                        placeholder="Monthly Gross Income *"
                        value={coBuyerFormData.monthlyGrossIncome}
                        onChange={handleCoBuyerChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                        required
                      />
                      <div className="flex gap-4">
                        <select
                          name="yearsAtJob"
                          value={coBuyerFormData.yearsAtJob}
                          onChange={handleCoBuyerChange}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                          required
                        >
                          <option value="">Years *</option>
                          {yearsArray.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                        <select
                          name="monthsAtJob"
                          value={coBuyerFormData.monthsAtJob}
                          onChange={handleCoBuyerChange}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-600"
                        >
                          <option value="">Months</option>
                          {monthsArray.map((month) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <label className="flex items-center gap-3 mt-6 text-black font-semibold">
                      <input
                        type="checkbox"
                        name="addPreviousEmployment"
                        checked={coBuyerFormData.addPreviousEmployment}
                        onChange={handleCoBuyerChange}
                        className="w-5 h-5 rounded"
                      />
                      Add Previous Employment
                    </label>
                  </div>

                  {/* Terms */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-sm text-gray-700 mb-4">
                      I accept all the above terms and conditions. By submitting this application, you authorize us to
                      obtain credit reports and verify employment information.
                    </p>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={coBuyerFormData.acceptTerms}
                        onChange={handleCoBuyerChange}
                        className="w-5 h-5 rounded accent-red-600"
                        required
                      />
                      <span className="text-black font-semibold">I accept all the above terms</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors text-lg"
                  >
                    SUBMIT
                  </button>
                </>
              )}
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
