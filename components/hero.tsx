"use client"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function Hero() {
  const fullText = "Dreaming About Your Next CAR?"
  const [displayText, setDisplayText] = useState(fullText)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setDisplayText("")
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
        className="relative h-[420px] md:h-[600px] lg:h-[720px] w-full bg-cover bg-center"
        style={{ backgroundImage: "url(/images/white-car-highway-wind-turbines-background-eco-journey.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center">
          <div className="flex flex-col justify-center z-10 w-full md:w-1/2 animate-slideUp">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-xl min-h-20">
              {displayText}
              {mounted && displayText.length < fullText.length && <span className="animate-pulse">|</span>}
            </h1>

            <p className="text-lg md:text-xl text-white mb-8 leading-relaxed drop-shadow-lg animate-fadeIn font-semibold">
              We are here to help you find it at Car Junction LLC
            </p>

            <Link href="/contact">
              <button
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-lg font-bold hover:opacity-90 transition-all w-fit shadow-lg btn-hover-lift text-lg"
                style={{ backgroundColor: "#EC3827" }}
              >
                Talk To Us Today!
                <ArrowRight size={22} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
