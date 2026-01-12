"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function FeaturesSection() {
  const features = [
    {
      title: "BUYING AND SELLING VEHICLES",
      description:
        "Let us know exactly what you're in the market for and we'll help you find it. With access to multiple exclusive industry sources, we can help you get into the ride you want.",
      cta: "View Inventory",
      href: "/inventory",
    },
    {
      title: "WE CAN GET YOU FINANCED",
      description:
        "With relations with multiple lenders, we are bound to get you financed! Good Credit, Bad Credit, First Time Buyer? Our lenders work with all types of scores and situations.",
      cta: "Get Approved",
      href: "/apply",
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
    <section className="bg-white py-10 md:py-14 px-4 md:px-6">
      <div className="max-w-[1700px] mx-auto">
        {/* HORIZONTAL layout with phone button */}
        <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6 mb-8 lg:mb-10">
          {/* Left - Heading and text - 90% width */}
          <div className="flex-1 max-w-5xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-3 leading-tight text-left">
              Cars and Trucks: Used Car Dealership in Los Angeles, CA
            </h2>
            <div className="h-1 w-16 bg-red-600 mb-4"></div>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed text-left">
              Our Dealership is dedicated to providing you with the ultimate automobile buying experience. We are your
              #1 source for buying a quality pre-owned vehicle. We have extensive relationships in the dealer community
              allowing us to purchase a wide variety of lease returns and new car trades at exceptional values. This
              enables our dealership to pass along huge savings on the highest quality vehicles of your choice. In
              addition, we offer a full array of financing options to meet your needs.
            </p>
          </div>

          {/* Right - Phone button NEXT TO heading */}
          <div className="flex items-center gap-3 bg-red-600 text-white p-4 px-5 rounded-lg whitespace-nowrap flex-shrink-0">
            <div className="text-2xl">☎</div>
            <div>
              <p className="text-xs font-semibold">Call Us For Your Next Ride</p>
              <p className="text-lg font-bold">(+62)21-2002-2012</p>
            </div>
          </div>
        </div>

        {/* 3 boxes and car - HORIZONTAL layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Middle - 3 feature boxes with MORE SPACING - 60% */}
          <div className="space-y-8 md:space-y-10 lg:col-span-7">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <button
                  className="w-full flex flex-col items-start p-6 md:p-7 bg-gradient-to-r from-red-50 to-transparent border border-red-200 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group card-hover animate-slideUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-black font-bold text-base md:text-lg mb-3 group-hover:text-red-600 transition-colors text-left">
                    {feature.title}
                  </span>
                  <span className="text-sm md:text-base text-gray-700 mb-5 leading-relaxed text-left">
                    {feature.description}
                  </span>
                  <span className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors">
                    {feature.cta}
                    <ArrowRight size={16} />
                  </span>
                </button>
              </Link>
            ))}
          </div>

          {/* Right side - car image - 40% */}
          <div
            className="flex justify-center lg:justify-end lg:col-span-5 animate-slideInRight"
            style={{ animationDelay: "200ms" }}
          >
            <div className="relative w-full max-w-md lg:max-w-full">
              <img
                src="/images/car.png"
                alt="Red car"
                className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
