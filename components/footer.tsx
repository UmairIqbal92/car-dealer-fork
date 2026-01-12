import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white relative pt-32">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8">
          {/* Brand Column */}
          <div>
            <Link href="/">
              <div className="mb-4 cursor-pointer hover:opacity-80 transition-opacity">
                <img src="/images/logo.png" alt="Cars & Trucks Logo" className="h-10 w-auto" />
              </div>
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Your trusted partner in finding quality used cars and trucks at unbeatable prices.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base mb-4 text-red-600">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/inventory" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Inventory
                </Link>
              </li>
              <li>
                <Link href="/finder" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Car Finder
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Apply Online
                </Link>
              </li>
            </ul>
          </div>

          {/* Research */}
          <div>
            <h3 className="font-bold text-base mb-4 text-red-600">Research</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/build-price" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Build & Price
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Compare Models
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Warranty
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-base mb-4 text-red-600">Newsletter</h3>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full px-3 py-2 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm"
              />
              <button className="w-full bg-red-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6" />

        {/* Bottom Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-500">
          <div>
            <p className="font-semibold text-white mb-1">Address</p>
            <p>2435 Glenda Ln Ste 4, Dallas, TX 75229</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-1">Email</p>
            <p>needhelp@company.com</p>
          </div>
          <div className="flex justify-start md:justify-end gap-4">
            <Link href="/privacy" className="hover:text-red-600 transition-colors">
              Privacy policy
            </Link>
            <Link href="/licensing" className="hover:text-red-600 transition-colors">
              Licensing
            </Link>
          </div>
        </div>
        <p className="text-gray-500 text-xs text-center md:text-left mt-6">
          &copy; {currentYear} Cars & Trucks Used Vehicle Shop. All rights reserved.
        </p>
      </div>

      {/* White Box Section for Cars - HALF the height */}
      <div className="bg-white h-20 md:h-24 relative overflow-visible">
        {/* White truck on left - positioned to overlap both white box and black footer */}
        <div className="hidden lg:block absolute left-4 xl:left-8 -top-20 md:-top-24 animate-slideUp" style={{ animationDelay: "300ms" }}>
          <img src="/images/car2.png" alt="White truck" className="h-44 md:h-48 w-auto drop-shadow-2xl opacity-95" />
        </div>
        {/* Red car on right - positioned to overlap both white box and black footer */}
        <div className="hidden lg:block absolute right-4 xl:right-8 -top-20 md:-top-24 animate-slideUp" style={{ animationDelay: "400ms" }}>
          <img src="/images/car1.png" alt="Red car" className="h-44 md:h-48 w-auto drop-shadow-2xl opacity-95" />
        </div>
      </div>

      {/* Red design line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-transparent" />
    </footer>
  )
}
