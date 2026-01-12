"use client"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

export default function Hero() {
  const [displayText, setDisplayText] = useState("")
  const fullText = "Dreaming About Your Next CAR?"

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden pt-0">
      <div
        className="relative h-[500px] md:h-[720px] lg:h-[864px] w-full bg-cover bg-center"
        style={{ backgroundImage: "url(/images/white-car-highway-wind-turbines-background-eco-journey.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center">
          <div className="flex flex-col justify-center z-10 w-full md:w-1/2 animate-slideUp">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-xl min-h-24">
              {displayText}
              {displayText.length < fullText.length && <span className="animate-pulse">|</span>}
            </h1>

            <p className="text-lg md:text-xl text-white mb-10 leading-relaxed drop-shadow-lg animate-fadeIn">
              We are here to help you find it
            </p>

            <button className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors w-fit shadow-lg btn-hover-lift">
              Talk To Us Today!
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
