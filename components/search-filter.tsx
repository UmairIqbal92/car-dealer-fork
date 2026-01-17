"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

export default function SearchFilter() {
  const router = useRouter()
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    bodyType: "",
    yearMin: "",
    yearMax: "",
    priceMin: "",
    priceMax: "",
    mileageMax: "",
  })

  const [makes, setMakes] = useState<string[]>([])
  const [models, setModels] = useState<string[]>([])
  const [bodyTypes, setBodyTypes] = useState<string[]>([])

  useEffect(() => {
    fetchOptions()
  }, [])

  const fetchOptions = async () => {
    try {
      const res = await fetch("/api/vehicle-options")
      const data = await res.json()
      if (data.success) {
        setMakes(data.makes || [])
        setModels(data.models || [])
        setBodyTypes(data.bodyTypes || [])
      }
    } catch (err) {
      console.error("Error fetching vehicle options:", err)
    }
  }

  const years = Array.from({ length: 36 }, (_, i) => 2025 - i)

  const priceRanges = [
    { label: "Under $5,000", value: "0-5000" },
    { label: "$5,000 - $10,000", value: "5000-10000" },
    { label: "$10,000 - $15,000", value: "10000-15000" },
    { label: "$15,000 - $20,000", value: "15000-20000" },
    { label: "$20,000 - $25,000", value: "20000-25000" },
    { label: "$25,000 - $30,000", value: "25000-30000" },
    { label: "$30,000 - $40,000", value: "30000-40000" },
    { label: "$40,000 - $50,000", value: "40000-50000" },
    { label: "$50,000+", value: "50000-999999" },
  ]

  const mileageOptions = [
    { label: "Under 25,000", value: "25000" },
    { label: "Under 50,000", value: "50000" },
    { label: "Under 75,000", value: "75000" },
    { label: "Under 100,000", value: "100000" },
    { label: "Under 125,000", value: "125000" },
    { label: "Under 150,000", value: "150000" },
    { label: "Any Mileage", value: "999999" },
  ]

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }))
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (filters.make) params.append("make", filters.make)
    if (filters.model) params.append("model", filters.model)
    if (filters.bodyType) params.append("bodyType", filters.bodyType)
    if (filters.yearMin) params.append("yearMin", filters.yearMin)
    if (filters.yearMax) params.append("yearMax", filters.yearMax)
    if (filters.priceMin && filters.priceMax) {
      params.append("priceMin", filters.priceMin)
      params.append("priceMax", filters.priceMax)
    }
    if (filters.mileageMax) params.append("mileageMax", filters.mileageMax)

    router.push(`/vehicles?${params.toString()}`)
  }

  const selectStyle = {
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 1rem center",
  }

  return (
    <section className="bg-transparent py-0 px-4 md:px-6 -mt-20 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl p-8 md:p-10 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Make */}
            <div>
              <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Make</label>
              <select
                value={filters.make}
                onChange={(e) => handleFilterChange("make", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-black text-base appearance-none cursor-pointer hover:border-[#C74B3F] focus:outline-none focus:ring-2 focus:border-transparent"
                style={selectStyle}
              >
                <option value="">Select Make</option>
                {makes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Model</label>
              <select
                value={filters.model}
                onChange={(e) => handleFilterChange("model", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-black text-base appearance-none cursor-pointer hover:border-[#C74B3F] focus:outline-none focus:ring-2 focus:border-transparent"
                style={selectStyle}
              >
                <option value="">Select Model</option>
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            {/* Body Type */}
            <div>
              <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Body Type</label>
              <select
                value={filters.bodyType}
                onChange={(e) => handleFilterChange("bodyType", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-black text-base appearance-none cursor-pointer hover:border-[#C74B3F] focus:outline-none focus:ring-2 focus:border-transparent"
                style={selectStyle}
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

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Year Min */}
            <div>
              <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Year From</label>
              <select
                value={filters.yearMin}
                onChange={(e) => handleFilterChange("yearMin", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-black text-base appearance-none cursor-pointer hover:border-[#C74B3F] focus:outline-none focus:ring-2 focus:border-transparent"
                style={selectStyle}
              >
                <option value="">Any Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Max */}
            <div>
              <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Year To</label>
              <select
                value={filters.yearMax}
                onChange={(e) => handleFilterChange("yearMax", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-black text-base appearance-none cursor-pointer hover:border-[#C74B3F] focus:outline-none focus:ring-2 focus:border-transparent"
                style={selectStyle}
              >
                <option value="">Any Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Price Range</label>
              <select
                value={filters.priceMin && filters.priceMax ? `${filters.priceMin}-${filters.priceMax}` : ""}
                onChange={(e) => {
                  const [min, max] = e.target.value.split("-")
                  handleFilterChange("priceMin", min || "")
                  handleFilterChange("priceMax", max || "")
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-black text-base appearance-none cursor-pointer hover:border-[#C74B3F] focus:outline-none focus:ring-2 focus:border-transparent"
                style={selectStyle}
              >
                <option value="">Any Price</option>
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Mileage */}
            <div>
              <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Max Mileage</label>
              <select
                value={filters.mileageMax}
                onChange={(e) => handleFilterChange("mileageMax", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-black text-base appearance-none cursor-pointer hover:border-[#C74B3F] focus:outline-none focus:ring-2 focus:border-transparent"
                style={selectStyle}
              >
                <option value="">Any Mileage</option>
                {mileageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-all text-base flex items-center justify-center gap-2"
                style={{ backgroundColor: "#C74B3F" }}
              >
                <Search size={20} />
                SEARCH NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
