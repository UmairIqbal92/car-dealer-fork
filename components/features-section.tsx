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
    <section className="bg-white py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left side - Text and Phone - 25% */}
          <div className="flex flex-col justify-start lg:col-span-3 animate-slideUp">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-3 leading-tight text-left">
              Cars and Trucks: Used Car Dealership in Los Angeles, CA
            </h2>

            <div className="h-1 w-16 bg-red-600 mb-6"></div>

            <p className="text-gray-700 text-sm mb-8 leading-relaxed text-left">
              Our Dealership is dedicated to providing you with the ultimate automobile buying experience. We are your
              #1 source for buying a quality pre-owned vehicle. We have extensive relationships in the dealer community
              allowing us to purchase a wide variety of lease returns and new car trades at exceptional values. This
              enables our dealership to pass along huge savings on the highest quality vehicles of your choice. In
              addition, we offer a full array of financing options to meet your needs.
            </p>

            <div className="flex items-center gap-3 bg-red-600 text-white p-4 rounded-lg w-fit">
              <div className="text-2xl">☎</div>
              <div>
                <p className="text-xs font-semibold">Call Us For Your Next Ride</p>
                <p className="text-lg font-bold">(+62)21-2002-2012</p>
              </div>
            </div>
          </div>

          {/* Middle - 3 feature boxes WIDER with MORE GAP - 42% */}
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

          {/* Right side - BIGGER red car image - 33% */}
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
