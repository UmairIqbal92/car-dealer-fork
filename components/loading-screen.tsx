"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted || !isLoading) return null

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center transition-opacity duration-500">
      <div className="text-center">
        <img src="/logo.png" alt="Car Junction LLC" className="h-24 w-auto mx-auto mb-6 animate-pulse" />
        <div className="flex gap-2 justify-center">
          <div className="w-3 h-3 bg-[#EC3827] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-3 h-3 bg-[#EC3827] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-3 h-3 bg-[#EC3827] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  )
}
