"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function BrowseByBrands() {
  const brands = [
    { name: "Acura", logo: "/brands/acura.jpg" },
    { name: "Ford", logo: "/brands/ford.jpg" },
    { name: "Bentley", logo: "/brands/bentley.jpg" },
    { name: "Chevrolet", logo: "/brands/chevrolet.jpg" },
    { name: "Ferrari", logo: "/brands/ferrari.jpg" },
    { name: "Mercedes", logo: "/brands/mercedes.jpg" },
  ]

  return (
    <section className="py-16 md:py-24 px-4 md:px-6" style={{ backgroundColor: "#F2F5FB" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-1 bg-red-600"></div>
            <p className="text-red-600 font-semibold text-sm tracking-widest uppercase">Find Your Car By Car Brand</p>
            <div className="w-12 h-1 bg-red-600"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-4">Browse By Brands</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-12">
          {brands.map((brand) => (
            <Link key={brand.name} href={`/inventory?brand=${brand.name.toLowerCase()}`}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer p-6 flex flex-col items-center justify-center min-h-[220px] group relative overflow-hidden border border-gray-100">
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Brand Logo */}
                <div className="relative z-10 mb-4 w-24 h-24 flex items-center justify-center">
                  <img
                    src={brand.logo || "/placeholder.svg"}
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-contain filter drop-shadow-sm group-hover:drop-shadow-lg transition-all"
                  />
                </div>

                {/* Brand Name - Bigger */}
                <p className="relative z-10 text-black font-bold text-lg text-center group-hover:text-red-600 transition-colors">
                  {brand.name}
                </p>

                {/* Arrow Icon - Bottom Right */}
                <div className="absolute bottom-4 right-4 bg-red-600 text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 z-20">
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link href="/inventory">
            <button className="inline-flex items-center gap-2 bg-red-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-red-700 transition-colors group text-lg">
              VIEW ALL
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
