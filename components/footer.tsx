import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-36 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <Link href="/">
              <div className="mb-6 cursor-pointer hover:opacity-80 transition-opacity">
                <img src="/logo.png" alt="Car Junction LLC Logo" className="h-12 w-auto bg-white p-2 rounded" />
              </div>
            </Link>
            <p className="text-gray-300 text-base leading-relaxed mb-6">
              Your trusted partner at Car Junction LLC for finding quality used cars and trucks at unbeatable prices in
              Dallas, TX.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#EC3827] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#EC3827] transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#EC3827] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#EC3827] transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-5" style={{ color: "#EC3827" }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#EC3827] transition-colors text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="text-gray-300 hover:text-[#EC3827] transition-colors text-base">
                  Browse Vehicles
                </Link>
              </li>
              <li>
                <Link href="/finder" className="text-gray-300 hover:text-[#EC3827] transition-colors text-base">
                  Car Finder
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-gray-300 hover:text-[#EC3827] transition-colors text-base">
                  Apply Online
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#EC3827] transition-colors text-base">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#EC3827] transition-colors text-base">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/export-query" className="text-gray-300 hover:text-[#EC3827] transition-colors text-base">
                  Export Query
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-5" style={{ color: "#EC3827" }}>
              Contact Info
            </h3>
            <ul className="space-y-3 text-gray-300 text-base">
              <li>
                <span className="font-semibold text-white block mb-1">Phone:</span>
                <a href="tel:2142156273" className="hover:text-[#EC3827] transition-colors">
                  (214) 215-6273
                </a>
              </li>
              <li>
                <span className="font-semibold text-white block mb-1">Email:</span>
                <a href="mailto:cjunctionllc@gmail.com" className="hover:text-[#EC3827] transition-colors break-all">
                  cjunctionllc@gmail.com
                </a>
              </li>
              <li>
                <span className="font-semibold text-white block mb-1">Hours:</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="font-bold text-lg mb-5" style={{ color: "#EC3827" }}>
              Address
            </h3>
            <p className="text-gray-300 text-base leading-relaxed">
              2435 Glenda Lane Ste 4<br />
              Dallas, Texas 75229
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-base">&copy; {currentYear} Car Junction LLC. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 text-base text-gray-400">
            <Link href="/privacy" className="hover:text-[#EC3827] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#EC3827] transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-[#EC3827] transition-colors">
              Cookies
            </Link>
            <Link href="/licensing" className="hover:text-[#EC3827] transition-colors">
              Licensing
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
