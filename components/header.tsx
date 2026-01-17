"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Menu, X, Search, Facebook, Twitter, Instagram, Youtube, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/vehicles?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <header className="bg-white shadow-sm">
      {/* Top Bar */}
      <div className="hidden md:block py-3 px-6 animate-slideDown" style={{ backgroundColor: "#EC3827" }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-100 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-100 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-100 transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-100 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
          <div className="flex gap-6 text-base">
            <div className="flex items-center gap-2 text-white">
              <Phone size={16} />
              <a href="tel:2142156273" className="font-semibold hover:text-gray-100 transition-colors">
                (214) 215-6273
              </a>
            </div>
            <div className="flex items-center gap-2 text-white">
              <MapPin size={16} />
              <span>2435 Glenda Ln Ste 4, Dallas, TX 75229</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <div className="flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
            <img src="/logo.png" alt="Car Junction LLC Logo" className="h-12 md:h-16 lg:h-20 w-auto object-contain" />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <Link href="/" className="text-black hover:text-[#EC3827] transition-colors font-semibold text-base">
            Home
          </Link>
          <Link href="/vehicles" className="text-black hover:text-[#EC3827] transition-colors font-semibold text-base">
            Browse Vehicles
          </Link>
          <Link href="/finder" className="text-black hover:text-[#EC3827] transition-colors font-semibold text-base">
            Car Finder
          </Link>
          <Link href="/apply" className="text-black hover:text-[#EC3827] transition-colors font-semibold text-base">
            Apply Online
          </Link>
          <Link href="/about" className="text-black hover:text-[#EC3827] transition-colors font-semibold text-base">
            About Us
          </Link>
          <Link href="/contact" className="text-black hover:text-[#EC3827] transition-colors font-semibold text-base">
            Contact Us
          </Link>
          <Link href="/export-query" className="text-black hover:text-[#EC3827] transition-colors font-semibold text-base">
            Export Query
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSearch}
            className="p-2 hover:text-[#EC3827] transition-colors hidden md:block"
            aria-label="Search"
          >
            <Search size={22} className="text-black" />
          </button>
          <Link
            href="/finder"
            className="hidden md:inline-block text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-all btn-hover-lift text-base"
            style={{ backgroundColor: "#EC3827" }}
          >
            Find a Car
          </Link>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="lg:hidden p-2" aria-label="Toggle menu">
            {isMenuOpen ? <X size={28} className="text-black" /> : <Menu size={28} className="text-black" />}
          </button>
        </div>
      </nav>

      {/* Search Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 animate-fadeIn"
          onClick={toggleSearch}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-black">Search Vehicles</h3>
              <button onClick={toggleSearch} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} className="text-black" />
              </button>
            </div>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by make, model, year, color..."
                className="w-full px-4 py-3 pr-28 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-[#EC3827] text-black"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white px-6 py-2 rounded-lg font-semibold"
                style={{ backgroundColor: "#EC3827" }}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white animate-slideDown">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block text-black hover:text-[#EC3827] transition-colors font-semibold py-3 text-lg"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/vehicles"
              className="block text-black hover:text-[#EC3827] transition-colors font-semibold py-3 text-lg"
              onClick={toggleMenu}
            >
              Browse Vehicles
            </Link>
            <Link
              href="/finder"
              className="block text-black hover:text-[#EC3827] transition-colors font-semibold py-3 text-lg"
              onClick={toggleMenu}
            >
              Car Finder
            </Link>
            <Link
              href="/apply"
              className="block text-black hover:text-[#EC3827] transition-colors font-semibold py-3 text-lg"
              onClick={toggleMenu}
            >
              Apply Online
            </Link>
            <Link
              href="/about"
              className="block text-black hover:text-[#EC3827] transition-colors font-semibold py-3 text-lg"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block text-black hover:text-[#EC3827] transition-colors font-semibold py-3 text-lg"
              onClick={toggleMenu}
            >
              Contact Us
            </Link>
            <Link
              href="/export-query"
              className="block text-black hover:text-[#EC3827] transition-colors font-semibold py-3 text-lg"
              onClick={toggleMenu}
            >
              Export Query
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
