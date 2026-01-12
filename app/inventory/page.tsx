"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChevronDown } from "lucide-react"

export default function InventoryPage() {
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    bodyType: "",
  })

  const [expandedFilters, setExpandedFilters] = useState({
    make: true,
    model: true,
    year: true,
    price: true,
    mileage: true,
    bodyType: true,
  })

  const makes = ["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Audi", "Chevrolet", "Nissan"]
  const models = ["Camry", "Accord", "F-150", "3 Series", "C-Class", "A4", "Silverado", "Altima"]
  const years = Array.from({ length: 20 }, (_, i) => 2024 - i)
  const bodyTypes = ["Sedan", "SUV", "Truck", "Coupe", "Hatchback"]

  // Demo car products
  const products = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    name: `${makes[i % makes.length]} ${models[i % models.length]}`,
    year: 2024 - (i % 5),
    price: 15000 + i * 2000,
    mileage: i * 5000,
    image: `/placeholder.svg?height=250&width=350&query=car%20${i + 1}`,
    color: ["Red", "Blue", "Black", "White", "Silver"][i % 5],
  }))

  const toggleFilter = (filterName: string) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }))
  }

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }))
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-black text-white py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Our Inventory</h1>
          <p className="text-gray-300">Browse our selection of quality used vehicles</p>
        </div>
      </section>

      {/* Inventory Section */}
      <section className="py-12 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold text-black mb-6">Filter</h2>

                {/* Make Filter */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <button
                    onClick={() => toggleFilter("make")}
                    className="flex items-center justify-between w-full mb-4"
                  >
                    <h3 className="font-bold text-black">Make</h3>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${expandedFilters.make ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedFilters.make && (
                    <select
                      value={filters.make}
                      onChange={(e) => handleFilterChange("make", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm"
                    >
                      <option value="">All Makes</option>
                      {makes.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Model Filter */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <button
                    onClick={() => toggleFilter("model")}
                    className="flex items-center justify-between w-full mb-4"
                  >
                    <h3 className="font-bold text-black">Model</h3>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${expandedFilters.model ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedFilters.model && (
                    <select
                      value={filters.model}
                      onChange={(e) => handleFilterChange("model", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm"
                    >
                      <option value="">All Models</option>
                      {models.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Year Filter */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <button
                    onClick={() => toggleFilter("year")}
                    className="flex items-center justify-between w-full mb-4"
                  >
                    <h3 className="font-bold text-black">Year</h3>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${expandedFilters.year ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedFilters.year && (
                    <select
                      value={filters.year}
                      onChange={(e) => handleFilterChange("year", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm"
                    >
                      <option value="">All Years</option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Price Filter */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <button
                    onClick={() => toggleFilter("price")}
                    className="flex items-center justify-between w-full mb-4"
                  >
                    <h3 className="font-bold text-black">Price</h3>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${expandedFilters.price ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedFilters.price && (
                    <select
                      value={filters.price}
                      onChange={(e) => handleFilterChange("price", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm"
                    >
                      <option value="">All Prices</option>
                      <option value="0-10000">$0 - $10,000</option>
                      <option value="10000-20000">$10,000 - $20,000</option>
                      <option value="20000-30000">$20,000 - $30,000</option>
                      <option value="30000+">$30,000+</option>
                    </select>
                  )}
                </div>

                {/* Mileage Filter */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <button
                    onClick={() => toggleFilter("mileage")}
                    className="flex items-center justify-between w-full mb-4"
                  >
                    <h3 className="font-bold text-black">Mileage</h3>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${expandedFilters.mileage ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedFilters.mileage && (
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="10000"
                      defaultValue="100000"
                      className="w-full accent-red-600"
                    />
                  )}
                </div>

                {/* Body Type Filter */}
                <div>
                  <button
                    onClick={() => toggleFilter("bodyType")}
                    className="flex items-center justify-between w-full mb-4"
                  >
                    <h3 className="font-bold text-black">Body Type</h3>
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${expandedFilters.bodyType ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedFilters.bodyType && (
                    <div className="space-y-2">
                      {bodyTypes.map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 accent-red-600" />
                          <span className="text-sm text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Content - Products Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Image */}
                    <div className="relative h-56 bg-gray-100 overflow-hidden group">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Featured
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-bold text-lg text-black mb-2">{product.name}</h3>
                      <div className="space-y-2 mb-4 text-sm text-gray-600">
                        <p>Year: {product.year}</p>
                        <p>Mileage: {product.mileage.toLocaleString()} miles</p>
                        <p>Color: {product.color}</p>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-red-600">${product.price.toLocaleString()}</span>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
