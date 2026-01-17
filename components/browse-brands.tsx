"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface Brand {
  id: number
  name: string
  slug: string
  logo: string | null
  vehicle_count: number
}

export default function BrowseByBrands() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBrands()
  }, [])

  const fetchBrands = async () => {
    try {
      const res = await fetch("/api/brands")
      const data = await res.json()
      if (data.success && data.brands.length > 0) {
        setBrands(data.brands.slice(0, 6))
      }
    } catch (err) {
      console.error("Error fetching brands:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 md:py-24 px-4 md:px-6" style={{ backgroundColor: "#F2F5FB" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-1" style={{ backgroundColor: "#C74B3F" }}></div>
              <p className="font-semibold text-sm tracking-widest uppercase" style={{ color: "#C74B3F" }}>
                Find Your Car By Car Brand
              </p>
              <div className="w-12 h-1" style={{ backgroundColor: "#C74B3F" }}></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Browse By Brands</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-8 min-h-[220px] animate-pulse">
                <div className="h-24 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (brands.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24 px-4 md:px-6" style={{ backgroundColor: "#F2F5FB" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-1" style={{ backgroundColor: "#C74B3F" }}></div>
            <p className="font-semibold text-sm tracking-widest uppercase" style={{ color: "#C74B3F" }}>
              Find Your Car By Car Brand
            </p>
            <div className="w-12 h-1" style={{ backgroundColor: "#C74B3F" }}></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Browse By Brands</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {brands.map((brand) => (
            <Link key={brand.id} href={`/vehicles?make=${encodeURIComponent(brand.name)}`}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer p-6 flex flex-col items-center justify-center min-h-[220px] group relative overflow-hidden border border-gray-100">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to bottom right, rgba(236, 56, 39, 0.05), transparent)" }}
                />

                <div className="relative z-10 mb-4 w-full h-28 flex items-center justify-center">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="max-w-[120px] max-h-[100px] w-auto h-auto object-contain filter drop-shadow-sm group-hover:drop-shadow-lg transition-all"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-400">{brand.name.charAt(0)}</span>
                    </div>
                  )}
                </div>

                <p className="relative z-10 text-black font-bold text-lg text-center group-hover:transition-colors">
                  {brand.name}
                </p>
                
                {brand.vehicle_count > 0 && (
                  <p className="relative z-10 text-gray-500 text-sm mt-1">
                    {brand.vehicle_count} {brand.vehicle_count === 1 ? 'vehicle' : 'vehicles'}
                  </p>
                )}

                <div
                  className="absolute bottom-4 right-4 text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 z-20"
                  style={{ backgroundColor: "#C74B3F" }}
                >
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/vehicles">
            <button
              className="inline-flex items-center gap-2 text-white px-10 py-4 rounded-lg font-bold hover:opacity-90 transition-all group text-lg"
              style={{ backgroundColor: "#C74B3F" }}
            >
              VIEW ALL
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
