"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingActions from "@/components/floating-actions"
import AdvancedSelect from "@/components/advanced-select"
import { SlidersHorizontal, Grid3x3, List, Car, Loader2 } from "lucide-react"

interface Vehicle {
  id: number
  name: string
  year: number
  price: number
  mileage: number
  color: string
  body_type: string
  fuel_type: string
  transmission: string
  make: string
  model: string
  images: string[]
  featured: boolean
}

interface Pagination {
  page: number
  limit: number
  totalCount: number
  totalPages: number
  hasMore: boolean
}

export default function VehiclesPage() {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [filters, setFilters] = useState({
    make: searchParams.get("make") || searchParams.get("brand") || "",
    model: searchParams.get("model") || "",
    year: searchParams.get("yearMin") || "",
    priceMin: searchParams.get("priceMin") || "",
    priceMax: searchParams.get("priceMax") || "",
    mileageMax: searchParams.get("mileageMax") || "",
    bodyType: searchParams.get("bodyType") || "",
    fuelType: searchParams.get("fuelType") || "",
    transmission: searchParams.get("transmission") || "",
  })
  const observerTarget = useRef<HTMLDivElement>(null)

  const makes = ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "BMW", "Mercedes-Benz", "Audi", "Jeep", "RAM", "GMC", "Hyundai", "Kia"]
  const models = ["Camry", "Accord", "F-150", "Silverado", "Altima", "3 Series", "C-Class", "A4", "Wrangler", "1500", "Tacoma", "CR-V", "Civic"]
  const years = Array.from({ length: 76 }, (_, i) => new Date().getFullYear() - i + 1)
  const bodyTypes = ["Sedan", "SUV", "Truck", "Coupe", "Hatchback", "Van", "Convertible"]
  const fuelTypes = ["Gasoline", "Diesel", "Hybrid", "Electric"]
  const transmissions = ["Automatic", "Manual"]

  const buildParams = useCallback((pageNum: number) => {
    const params = new URLSearchParams()
    params.append("page", pageNum.toString())
    params.append("limit", "12")
    if (searchQuery) params.append("search", searchQuery)
    if (filters.make) params.append("make", filters.make)
    if (filters.model) params.append("model", filters.model)
    if (filters.year) params.append("yearMin", filters.year)
    if (filters.priceMin) params.append("priceMin", filters.priceMin)
    if (filters.priceMax) params.append("priceMax", filters.priceMax)
    if (filters.mileageMax) params.append("mileageMax", filters.mileageMax)
    if (filters.bodyType) params.append("bodyType", filters.bodyType)
    if (filters.fuelType) params.append("fuelType", filters.fuelType)
    if (filters.transmission) params.append("transmission", filters.transmission)
    return params
  }, [searchQuery, filters])

  const fetchVehicles = useCallback(async (pageNum: number, append: boolean = false) => {
    if (append) {
      setLoadingMore(true)
    } else {
      setLoading(true)
    }
    try {
      const params = buildParams(pageNum)
      const res = await fetch(`/api/vehicles?${params.toString()}`)
      const data = await res.json()
      
      if (append) {
        setVehicles(prev => [...prev, ...(data.vehicles || [])])
      } else {
        setVehicles(data.vehicles || [])
      }
      setPagination(data.pagination || null)
    } catch (err) {
      console.error("Error fetching vehicles:", err)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [buildParams])

  useEffect(() => {
    setPage(1)
    fetchVehicles(1, false)
  }, [filters, searchQuery])

  useEffect(() => {
    const urlSearch = searchParams.get("search")
    if (urlSearch !== searchQuery) {
      setSearchQuery(urlSearch || "")
    }
  }, [searchParams])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && pagination?.hasMore && !loadingMore && !loading) {
          const nextPage = page + 1
          setPage(nextPage)
          fetchVehicles(nextPage, true)
        }
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [pagination?.hasMore, loadingMore, loading, page, fetchVehicles])

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setFilters({
      make: "",
      model: "",
      year: "",
      priceMin: "",
      priceMax: "",
      mileageMax: "",
      bodyType: "",
      fuelType: "",
      transmission: "",
    })
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <FloatingActions />

      <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Browse Our Vehicles</h1>
          <p className="text-gray-300 text-lg">Find your perfect car from our quality selection</p>
        </div>
      </section>

      <section className="py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-5 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
                <div className="flex items-center gap-2 mb-5">
                  <SlidersHorizontal size={22} className="text-[#EC3827]" />
                  <h2 className="text-xl font-bold text-black">Filters</h2>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-1.5">Make</label>
                    <AdvancedSelect
                      options={makes}
                      value={filters.make}
                      onChange={(val) => handleFilterChange("make", val)}
                      placeholder="Select Make"
                      name="make"
                      searchable={true}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black mb-1.5">Model</label>
                    <AdvancedSelect
                      options={models}
                      value={filters.model}
                      onChange={(val) => handleFilterChange("model", val)}
                      placeholder="Select Model"
                      name="model"
                      searchable={true}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black mb-1.5">Year</label>
                    <AdvancedSelect
                      options={years}
                      value={filters.year}
                      onChange={(val) => handleFilterChange("year", val)}
                      placeholder="Select Year"
                      name="year"
                      searchable={true}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-sm font-semibold text-black mb-1.5">Min Price</label>
                      <input
                        type="number"
                        placeholder="$0"
                        value={filters.priceMin}
                        onChange={(e) => handleFilterChange("priceMin", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black mb-1.5">Max Price</label>
                      <input
                        type="number"
                        placeholder="Any"
                        value={filters.priceMax}
                        onChange={(e) => handleFilterChange("priceMax", e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black mb-1.5">Max Mileage</label>
                    <input
                      type="number"
                      placeholder="Any"
                      value={filters.mileageMax}
                      onChange={(e) => handleFilterChange("mileageMax", e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black mb-1.5">Body Type</label>
                    <AdvancedSelect
                      options={bodyTypes}
                      value={filters.bodyType}
                      onChange={(val) => handleFilterChange("bodyType", val)}
                      placeholder="Select Body Type"
                      name="bodyType"
                      searchable={false}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black mb-1.5">Fuel Type</label>
                    <AdvancedSelect
                      options={fuelTypes}
                      value={filters.fuelType}
                      onChange={(val) => handleFilterChange("fuelType", val)}
                      placeholder="Select Fuel Type"
                      name="fuelType"
                      searchable={false}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black mb-1.5">Transmission</label>
                    <AdvancedSelect
                      options={transmissions}
                      value={filters.transmission}
                      onChange={(val) => handleFilterChange("transmission", val)}
                      placeholder="Select Transmission"
                      name="transmission"
                      searchable={false}
                    />
                  </div>

                  <button
                    onClick={clearFilters}
                    className="w-full py-2.5 border-2 border-gray-300 text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <p className="text-gray-700 font-semibold">
                  {loading ? "Loading..." : pagination ? `Showing ${vehicles.length} of ${pagination.totalCount} vehicles` : `Showing ${vehicles.length} vehicles`}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg cursor-pointer transition-colors ${viewMode === "grid" ? "bg-[#EC3827] text-white" : "bg-white text-black hover:bg-gray-100"}`}
                  >
                    <Grid3x3 size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg cursor-pointer transition-colors ${viewMode === "list" ? "bg-[#EC3827] text-white" : "bg-white text-black hover:bg-gray-100"}`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#EC3827] border-t-transparent"></div>
                </div>
              ) : vehicles.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                  <Car size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-black mb-2">No vehicles found</h3>
                  <p className="text-gray-500">Try adjusting your filters or check back later for new inventory.</p>
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "flex flex-col gap-6"
                  }
                >
                  {vehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                        viewMode === "list" ? "flex flex-col sm:flex-row" : ""
                      }`}
                    >
                      <Link
                        href={`/vehicles/${vehicle.id}`}
                        className={`relative ${viewMode === "list" ? "w-full sm:w-1/3 h-48 sm:h-auto" : "h-56"} bg-gray-200 overflow-hidden group cursor-pointer`}
                      >
                        {vehicle.images?.[0] ? (
                          <img
                            src={vehicle.images[0]}
                            alt={vehicle.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Car size={48} className="text-gray-400" />
                          </div>
                        )}
                        {vehicle.featured && (
                          <div className="absolute top-3 right-3 bg-[#EC3827] text-white px-3 py-1 rounded-full text-sm font-bold">
                            Featured
                          </div>
                        )}
                      </Link>

                      <div className={`p-6 ${viewMode === "list" ? "w-full sm:w-2/3" : ""}`}>
                        <Link href={`/vehicles/${vehicle.id}`} className="cursor-pointer">
                          <h3 className="font-bold text-xl text-black mb-3 hover:text-[#EC3827] transition-colors">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </h3>
                        </Link>
                        <div
                          className={`space-y-2 mb-4 text-sm text-gray-600 ${viewMode === "list" ? "grid grid-cols-2 gap-x-4" : ""}`}
                        >
                          <p>
                            <span className="font-semibold">Mileage:</span> {vehicle.mileage?.toLocaleString() || 0} mi
                          </p>
                          <p>
                            <span className="font-semibold">Body:</span> {vehicle.body_type || "N/A"}
                          </p>
                          <p>
                            <span className="font-semibold">Fuel:</span> {vehicle.fuel_type || "N/A"}
                          </p>
                          <p>
                            <span className="font-semibold">Transmission:</span> {vehicle.transmission || "N/A"}
                          </p>
                          {vehicle.color && (
                            <p>
                              <span className="font-semibold">Color:</span> {vehicle.color}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <span className="text-2xl md:text-3xl font-bold text-[#EC3827]">
                            ${vehicle.price?.toLocaleString() || 0}
                          </span>
                          <Link
                            href={`/vehicles/${vehicle.id}`}
                            className="bg-[#EC3827] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-[#d42f1f] transition-colors cursor-pointer"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Infinite scroll observer target */}
              <div ref={observerTarget} className="py-8 flex justify-center">
                {loadingMore && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <Loader2 className="h-6 w-6 animate-spin text-[#EC3827]" />
                    <span>Loading more vehicles...</span>
                  </div>
                )}
                {!loading && !loadingMore && pagination && !pagination.hasMore && vehicles.length > 0 && (
                  <p className="text-gray-500">You&apos;ve seen all {pagination.totalCount} vehicles</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
