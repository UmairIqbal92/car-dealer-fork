"use client"

import { useState } from "react"

export default function SearchFilter() {
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    bodyType: "",
    yearMin: 1995,
    yearMax: 2024,
    priceMin: 0,
    priceMax: 50000,
    mileageMin: 0,
    mileageMax: 100000,
  })

  const makes = ["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Audi", "Chevrolet", "Nissan"]
  const models = ["Camry", "Accord", "F-150", "3 Series", "C-Class", "A4", "Silverado", "Altima"]
  const bodyTypes = ["Sedan", "SUV", "Truck", "Coupe", "Hatchback", "Convertible", "Van", "Wagon"]

  const handleFilterChange = (filterName: string, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }))
  }

  const handleSearch = () => {
    console.log("Search filters:", filters)
  }

  return (
    <section className="bg-transparent py-0 px-4 md:px-6 -mt-24 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 border border-gray-200">
          {/* Row 1: Make, Model, Body Type - 3 equal columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div>
              <label className="block text-xs font-semibold text-black mb-1 uppercase tracking-wide">Make</label>
              <select
                value={filters.make}
                onChange={(e) => handleFilterChange("make", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm appearance-none cursor-pointer hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Select Make</option>
                {makes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-black mb-1 uppercase tracking-wide">Model</label>
              <select
                value={filters.model}
                onChange={(e) => handleFilterChange("model", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm appearance-none cursor-pointer hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Select Model</option>
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-black mb-1 uppercase tracking-wide">Body Type</label>
              <select
                value={filters.bodyType}
                onChange={(e) => handleFilterChange("bodyType", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm appearance-none cursor-pointer hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Choose Car Type</option>
                {bodyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Split into 70% left (sliders) and 30% right (CTA) */}
          <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
            {/* Left container: 70% width - SINGLE-LINE SLIDERS ONLY */}
            <div className="md:col-span-7">
              <div className="grid grid-cols-3 gap-4">
                {/* Year - Single line slider */}
                <div>
                  <label className="block text-xs font-semibold text-black mb-2 uppercase tracking-wide">Year</label>
                  <input
                    type="range"
                    min="1995"
                    max="2024"
                    value={filters.yearMin}
                    onChange={(e) => handleFilterChange("yearMin", Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="text-xs text-gray-600 mt-1">
                    {filters.yearMin} - {filters.yearMax}
                  </div>
                </div>

                {/* Price - Single line slider */}
                <div>
                  <label className="block text-xs font-semibold text-black mb-2 uppercase tracking-wide">Price</label>
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="1000"
                    value={filters.priceMin}
                    onChange={(e) => handleFilterChange("priceMin", Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="text-xs text-gray-600 mt-1">
                    ${(filters.priceMin / 1000).toFixed(0)}K - ${(filters.priceMax / 1000).toFixed(0)}K
                  </div>
                </div>

                {/* Mileage - Single line slider */}
                <div>
                  <label className="block text-xs font-semibold text-black mb-2 uppercase tracking-wide">Mileage</label>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={filters.mileageMin}
                    onChange={(e) => handleFilterChange("mileageMin", Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="text-xs text-gray-600 mt-1">
                    {(filters.mileageMin / 1000).toFixed(0)}K - {(filters.mileageMax / 1000).toFixed(0)}K
                  </div>
                </div>
              </div>
            </div>

            {/* Right container: 30% width - Compact CTA */}
            <div className="md:col-span-3 flex flex-col justify-center gap-2">
              <p className="text-black font-bold text-sm">Choose Your Car</p>
              <button
                onClick={handleSearch}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-xs"
              >
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
