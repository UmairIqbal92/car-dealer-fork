"use client"

import { ArrowRight, CreditCard, Search, Car } from "lucide-react"
import Link from "next/link"

export default function FeaturesSection() {
  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 md:py-20 px-4 md:px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left side - Buying and Selling Section */}
          <div className="lg:col-span-3 flex">
            <div className="bg-black text-white rounded-2xl p-8 flex flex-col justify-between w-full shadow-2xl">
              <div>
                <div className="w-14 h-14 bg-[#EC3827] rounded-xl flex items-center justify-center mb-6">
                  <Car size={28} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-4 leading-tight">
                  Buying and Selling Vehicles
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-8">
                  Let us know exactly what you're in the market for and we'll help you find it. With access to multiple exclusive industry sources, we can help you get into the ride you want.
                </p>
              </div>
              <Link href="/vehicles">
                <button className="w-full flex items-center justify-center gap-2 bg-[#EC3827] text-white px-6 py-4 rounded-xl font-bold text-sm hover:bg-[#d42f1f] transition-all duration-300 shadow-lg hover:shadow-xl">
                  View Inventory
                  <ArrowRight size={18} />
                </button>
              </Link>
            </div>
          </div>

          {/* Middle - 2 feature boxes */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Financing Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex-1 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-gradient-to-br from-[#EC3827] to-[#ff6b5b] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <CreditCard size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-black mb-2 group-hover:text-[#EC3827] transition-colors">
                    WE CAN GET YOU FINANCED
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    With relations with multiple lenders, we are bound to get you financed! Good Credit, Bad Credit, First Time Buyer? Our lenders work with all types of scores.
                  </p>
                  <Link href="/apply-online">
                    <button className="inline-flex items-center gap-2 bg-[#EC3827] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#d42f1f] transition-all duration-300 shadow-md hover:shadow-lg">
                      Get Approved
                      <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Help Find Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex-1 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-gradient-to-br from-[#EC3827] to-[#ff6b5b] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <Search size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-black mb-2 group-hover:text-[#EC3827] transition-colors">
                    WE CAN HELP YOU FIND IT!
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Do you have questions or comments for us? We'd love to hear them! Fill out the form and we will get back to you as soon as possible.
                  </p>
                  <Link href="/contact">
                    <button className="inline-flex items-center gap-2 bg-[#EC3827] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#d42f1f] transition-all duration-300 shadow-md hover:shadow-lg">
                      Contact Us
                      <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Red car image */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <div className="relative w-full">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#EC3827]/10 to-transparent rounded-3xl blur-2xl"></div>
              <img
                src="/images/car.png"
                alt="Red car"
                className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 relative z-10"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
