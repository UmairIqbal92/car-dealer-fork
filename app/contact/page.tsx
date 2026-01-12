"use client"

import type React from "react"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section
        className="bg-cover bg-center bg-no-repeat py-32 px-4 md:px-6 relative"
        style={{ backgroundImage: "url(/images/white-car-highway-wind-turbines-background-eco-journey.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">Contact Us</h1>
          <div className="flex items-center gap-2 text-lg text-white">
            <Link href="/" className="hover:text-red-300 transition-colors">
              Home
            </Link>
            <span className="text-red-600">•</span>
            <span>Contact us</span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column - Office Info */}
            <div>
              <h2 className="text-4xl font-bold text-black mb-8">Visit Our Office</h2>

              <div className="space-y-8">
                {/* Office Location */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">Office Location</h3>
                    <p className="text-gray-700">2435 Glenda Ln Ste 4, Dallas, TX 75229</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">Phone Number</h3>
                    <a href="tel:(888)111-1111" className="text-gray-700 hover:text-red-600 transition-colors">
                      (888) 111-1111
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">Email Address</h3>
                    <a
                      href="mailto:needhelp@company.com"
                      className="text-gray-700 hover:text-red-600 transition-colors"
                    >
                      needhelp@company.com
                    </a>
                  </div>
                </div>

                {/* Open Time */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">Open Time</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Mon-Wed: 8:00 AM - 6:00 PM
                      <br />
                      Thu: Closed
                      <br />
                      Fri-Sun: 8:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="font-bold text-black text-lg mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <h2 className="text-4xl font-bold text-black mb-8">Get in Touch</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Your name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Your email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+(234) 456 789 1234"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Message subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message here..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors text-lg"
                >
                  SUBMIT →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
