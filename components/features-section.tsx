"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function FeaturesSection() {
  const features = [
    {
      title: "WE CAN GET YOU FINANCED",
      description:
        "With relations with multiple lenders, we are bound to get you financed! Good Credit, Bad Credit, First Time Buyer? Our lenders work with all types of scores and situations.",
      cta: "Get Approved",
      href: "/apply-online",
    },
    {
      title: "WE CAN HELP YOU FIND IT!",
      description:
        "Do you have questions or comments for us? We'd love to hear them! Fill out the form below and we will get back to you as soon as possible.",
      cta: "Contact Us",
      href: "/contact",
    },
  ]

  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left side - Buying and Selling Section */}
          <div className="flex flex-col justify-start lg:col-span-3 animate-slideUp">
            <h2 className="text-lg md:text-xl font-bold text-black mb-3 leading-tight text-left uppercase tracking-wide">
              Buying and Selling Vehicles
            </h2>

            <div className="h-1 w-16 bg-red-600 mb-6"></div>

            <p className="text-gray-700 text-sm mb-8 leading-relaxed text-left">
              Let us know exactly what you're in the market for and we'll help you find it. With access to multiple exclusive industry sources, we can help you get into the ride you want.
            </p>

            <Link href="/vehicles">
              <button className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded font-semibold text-sm hover:bg-red-700 transition-colors">
                View Inventory
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>

          {/* Middle - 2 feature boxes */}
          <div className="space-y-10 lg:col-span-5">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <button
                  className="w-full flex flex-col items-start p-7 bg-gradient-to-r from-red-50 to-transparent border border-red-200 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group card-hover animate-slideUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-black font-bold text-base mb-3 group-hover:text-red-600 transition-colors text-left">
                    {feature.title}
                  </span>
                  <span className="text-sm text-gray-700 mb-5 leading-relaxed text-left">{feature.description}</span>
                  <span className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded font-semibold text-sm hover:bg-red-700 transition-colors">
                    {feature.cta}
                    <ArrowRight size={16} />
                  </span>
                </button>
              </Link>
            ))}
          </div>

          {/* Right side - Red car image */}
          <div
            className="flex justify-center lg:justify-end lg:col-span-4 animate-slideInRight"
            style={{ animationDelay: "200ms" }}
          >
            <div className="relative w-full h-full">
              <img
                src="/images/car.png"
                alt="Red car"
                className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                style={{ maxHeight: '550px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
