"use client"

import { useState, Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChevronDown, Search } from "lucide-react"

function InventoryContent() {
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    bodyType: "",
  })

  const [searchTerm, setSearchTerm] = useState("")

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
  const bodyTypes = ["Sedan", "SUV", "Truck", "Coupe", "Hatchback", "Van"]

  // Demo car products - 8 items for dealer inventory
  const products = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `${makes[i % makes.length]} ${models[i % models.length]}`,
    year: 2024 - (i % 5),
    price: 18000 + i * 3500,
    mileage: i * 4000,
    image: `/placeholder.svg?height=280&width=380&query=dealer%20car%20${i + 1}`,
    color: ["Red", "Blue", "Black", "White", "Silver", "Gray", "Gold", "Orange"][i % 8],
    stock: `STK${String(1001 + i).padStart(5, "0")}`,
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

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.stock.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      {/* Page Header with Dealer Branding */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center">
              <img src="/images/logo.png" alt="Dealer Logo" className="h-8 w-auto" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Dealer Inventory</h1>
          <p className="text-red-100 text-lg max-w-3xl">
            Explore our exclusive collection of premium used vehicles from Cars & Trucks dealership
          </p>
        </div>
      </section>

      {/* Inventory Section */}
      <section className="py-12 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Sidebar - Filters (20%) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold text-black mb-6">Refine Search</h2>

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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <option value="">All Prices</option>
                      <option value="0-15000">$0 - $15,000</option>
                      <option value="15000-25000">$15,000 - $25,000</option>
                      <option value="25000-40000">$25,000 - $40,000</option>
                      <option value="40000+">$40,000+</option>
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
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="200000"
                        step="10000"
                        defaultValue="100000"
                        className="w-full accent-red-600 cursor-pointer"
                      />
                      <p className="text-xs text-gray-600 text-center">0 - 200k miles</p>
                    </div>
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
                        <label key={type} className="flex items-center gap-2 cursor-pointer hover:text-red-600">
                          <input type="checkbox" className="w-4 h-4 accent-red-600 cursor-pointer" />
                          <span className="text-sm text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Content - Products Grid (80%) */}
            <div className="lg:col-span-4">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by vehicle name or stock number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-gray-600 text-sm">
                  Showing <span className="font-bold text-black">{filteredProducts.length}</span> vehicles
                </p>
              </div>

              {/* Products Grid - 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Image Container */}
                    <div className="relative h-56 bg-gray-100 overflow-hidden group">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded text-xs font-bold">
                        {product.stock}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-black mb-3">{product.name}</h3>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-600">
                        <p>
                          <span className="font-semibold text-black">Year:</span> {product.year}
                        </p>
                        <p>
                          <span className="font-semibold text-black">Color:</span> {product.color}
                        </p>
                        <p className="col-span-2">
                          <span className="font-semibold text-black">Mileage:</span> {product.mileage.toLocaleString()}{" "}
                          miles
                        </p>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <span className="text-2xl font-bold text-red-600">${product.price.toLocaleString()}</span>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results Message */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-600 text-lg mb-4">No vehicles found matching your criteria</p>
                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setFilters({ make: "", model: "", year: "", price: "", mileage: "", bodyType: "" })
                    }}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default function InventoryWithDealerPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <InventoryContent />
      </Suspense>
      <Footer />
    </main>
  )
}
