"use client"

export default function StatsSection() {
  const stats = [
    { number: "1,200", label: "Vehicle in stock Cars", icon: "/images/icon1.png" },
    { number: "120K", label: "Satisfied customers", icon: "/images/icon2.png" },
    { number: "1,200", label: "Award achievement", icon: "/images/icon3.png" },
    { number: "60+", label: "Vehicle in stock Cars", icon: "/images/icon3.png" },
  ]

  return (
    <section
      className="relative py-24 px-4 md:px-6 bg-cover bg-center"
      style={{ backgroundImage: "url(/images/70036.jpg)" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header with animations */}
        <div className="text-center mb-16 animate-slideDown">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Cars and Trucks: Used Car Dealership in Los Angeles, CA
          </h2>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Our Dealership is dedicated to providing you with the ultimate automobile buying experience.
          </p>
        </div>

        {/* Stats Grid with staggered animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 text-center hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 animate-fadeIn"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <img src={stat.icon || "/placeholder.svg"} alt={stat.label} className="w-16 h-16 mx-auto mb-4" />
              <div className="text-4xl font-bold text-red-600 mb-2">{stat.number}</div>
              <div className="text-gray-700 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
