"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "John Smith",
      role: "Car Buyer",
      image: "/customer-avatar.png",
      content:
        "Excellent service and fantastic selection of vehicles. The team was incredibly helpful in finding the perfect car for my family!",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      role: "First Time Buyer",
      image: "/customer-avatar.png",
      content:
        "Amazing financing options and very friendly staff. They made the entire process smooth and hassle-free. Highly recommended!",
      rating: 5,
    },
    {
      name: "Michael Davis",
      role: "Returning Customer",
      image: "/customer-avatar.png",
      content:
        "Best used car dealership in the city. Great prices, quality vehicles, and outstanding customer service. Will definitely be back!",
      rating: 5,
    },
  ]

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const getVisibleTestimonials = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length])
    }
    return visible
  }

  const visibleTestimonials = getVisibleTestimonials()

  return (
    <section className="bg-gray-50 py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-red-600 font-semibold text-sm tracking-widest uppercase mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">What Our Clients Say About Us!</h2>
        </div>

        {/* Testimonials Grid - 3 visible */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {visibleTestimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center">
              {/* Quote badge */}
              <div className="mb-4">
                <div className="text-red-600 font-bold text-4xl">"</div>
              </div>

              {/* Avatar */}
              <div className="mb-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-red-600"
                />
              </div>

              {/* Name and role */}
              <h3 className="font-bold text-black text-lg mb-1">{testimonial.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{testimonial.role}</p>

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-4">
                {Array(testimonial.rating)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} className="text-red-600">
                      ★
                    </span>
                  ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 text-sm leading-relaxed">{testimonial.content}</p>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={goToPrevious}
            className="bg-white border-2 border-gray-300 text-black p-3 rounded-full hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Indicator dots */}
          <div className="flex gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-red-600 w-8" : "bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="bg-white border-2 border-gray-300 text-black p-3 rounded-full hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors"
            aria-label="Next testimonials"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}
