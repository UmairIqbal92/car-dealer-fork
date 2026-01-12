"use client"

import { useState } from "react"
import { Menu, X, Search, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="bg-white">
      {/* Top info bar */}
      <div className="hidden md:block bg-red-600 py-3 px-6 animate-slideDown">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-100 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-100 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={16} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-100 transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={16} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-100 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2 text-white">
              <span className="font-semibold">SALES: (888) 111-1111</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <span>2435 Glenda Ln Ste 4, Dallas, TX 75229</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <nav className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        <Link href="/">
          <div className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-2">
              <img src="/images/logo.png" alt="Cars & Trucks Logo" className="h-14 w-auto" />
            </div>
          </div>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-black hover:text-red-600 transition-colors font-medium">
            Home
          </Link>
          <div className="group relative">
            <button className="text-black hover:text-red-600 transition-colors font-medium flex items-center gap-1">
              Inventory
              <span className="text-xs">▼</span>
            </button>
            {/* Dropdown */}
            <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <Link
                href="/inventory"
                className="block px-4 py-3 text-black hover:bg-red-50 hover:text-red-600 first:rounded-t-lg"
              >
                All Inventory
              </Link>
              <Link
                href="/inventory/dealer"
                className="block px-4 py-3 text-black hover:bg-red-50 hover:text-red-600 last:rounded-b-lg"
              >
                Inventory with Dealer
              </Link>
            </div>
          </div>
          <Link href="/finder" className="text-black hover:text-red-600 transition-colors font-medium">
            Car Finder
          </Link>
          <Link href="/apply" className="text-black hover:text-red-600 transition-colors font-medium">
            Apply Online
          </Link>
          <Link href="/about" className="text-black hover:text-red-600 transition-colors font-medium">
            About Us
          </Link>
          <Link href="/contact" className="text-black hover:text-red-600 transition-colors font-medium">
            Contact Us
          </Link>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:text-red-600 transition-colors hidden md:block" aria-label="Search">
            <Search size={20} className="text-black" />
          </button>
          <Link
            href="/finder"
            className="hidden md:inline-block bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors btn-hover-lift"
          >
            Find a Car
          </Link>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden p-2" aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} className="text-black" /> : <Menu size={24} className="text-black" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white animate-slideDown">
          <div className="px-4 py-4 space-y-3">
            <Link href="/" className="block text-black hover:text-red-600 transition-colors font-medium py-2">
              Home
            </Link>
            <div>
              <div className="text-black font-medium py-2">Inventory</div>
              <div className="pl-4 space-y-2">
                <Link href="/inventory" className="block text-gray-700 hover:text-red-600 transition-colors">
                  All Inventory
                </Link>
                <Link href="/inventory/dealer" className="block text-gray-700 hover:text-red-600 transition-colors">
                  Inventory with Dealer
                </Link>
              </div>
            </div>
            <Link href="/finder" className="block text-black hover:text-red-600 transition-colors font-medium py-2">
              Car Finder
            </Link>
            <Link href="/apply" className="block text-black hover:text-red-600 transition-colors font-medium py-2">
              Apply Online
            </Link>
            <Link href="/about" className="block text-black hover:text-red-600 transition-colors font-medium py-2">
              About Us
            </Link>
            <Link href="/contact" className="block text-black hover:text-red-600 transition-colors font-medium py-2">
              Contact Us
            </Link>
            <Link
              href="/finder"
              className="block bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-center mt-4"
            >
              Find a Car
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
