"use client"

import type React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingActions from "@/components/floating-actions"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react"
import { useState, useEffect } from "react"

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [captchaAnswer, setCaptchaAnswer] = useState("")
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: 0 })

  useEffect(() => {
    generateCaptcha()
  }, [])

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 8) + 2
    const num2 = Math.floor(Math.random() * 8) + 1
    setCaptcha({ num1, num2, answer: num1 + num2 })
    setCaptchaAnswer("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (parseInt(captchaAnswer) !== captcha.answer) {
      alert("Incorrect answer. Please try again.")
      generateCaptcha()
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
        generateCaptcha()
      } else {
        alert("Failed to send message. Please try again.")
      }
    } catch (err) {
      console.error("Error sending message:", err)
      alert("An error occurred. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <FloatingActions />

      <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Contact Us</h1>
          <p className="text-gray-300 text-lg">Get in touch with Car Junction LLC</p>
        </div>
      </section>

      <section className="py-20 md:py-24 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-10">Visit Our Office</h2>

              <div className="space-y-8">
                <div className="flex gap-5">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#C74B3F" }}
                  >
                    <MapPin size={26} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">Office Location</h3>
                    <p className="text-gray-700 leading-relaxed">
                      2435 Glenda Lane Ste 4<br />
                      Dallas, Texas 75229
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#C74B3F" }}
                  >
                    <Phone size={26} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">Phone Number</h3>
                    <a href="tel:2142156273" className="text-gray-700 hover:text-[#C74B3F] transition-colors text-lg">
                      (214) 215-6273
                    </a>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#C74B3F" }}
                  >
                    <Mail size={26} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">Email Address</h3>
                    <a
                      href="mailto:cjunctionllc@gmail.com"
                      className="text-gray-700 hover:text-[#C74B3F] transition-colors break-all"
                    >
                      cjunctionllc@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#C74B3F" }}
                  >
                    <Clock size={26} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">Business Hours</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Monday - Saturday<br />
                      9:00 AM - 7:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="font-bold text-black text-lg mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-all"
                    style={{ backgroundColor: "#C74B3F" }}
                    aria-label="Facebook"
                  >
                    <Facebook size={22} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-all"
                    style={{ backgroundColor: "#C74B3F" }}
                    aria-label="Instagram"
                  >
                    <Instagram size={22} />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-all"
                    style={{ backgroundColor: "#C74B3F" }}
                    aria-label="YouTube"
                  >
                    <Youtube size={22} />
                  </a>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="font-bold text-black text-lg mb-4">Find Us On Map</h3>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.8!2d-96.896054!3d32.890192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c27651940d9c7%3A0x3653d7110ff220bc!2sCar%20Junction!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Car Junction Location"
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-10">Get in Touch</h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">Thank you for contacting us. We'll get back to you soon.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[#C74B3F] font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-base font-semibold text-black mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-black mb-2">Your Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-black mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(214) 215-6273"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-black mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-black mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your message here..."
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C74B3F] resize-none"
                      required
                    ></textarea>
                  </div>

                  <div className="bg-[#FFF5F4] border-2 border-[#C74B3F] p-4 rounded-lg">
                    <label className="block text-base font-bold text-[#C74B3F] mb-2">
                      Security Check: What is {captcha.num1} + {captcha.num2}? *
                    </label>
                    <input
                      type="number"
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                      placeholder="Enter your answer"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-black text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full text-white px-6 py-4 rounded-lg font-bold hover:opacity-90 transition-colors text-lg disabled:opacity-50"
                    style={{ backgroundColor: "#C74B3F" }}
                  >
                    {submitting ? "SENDING..." : "SEND MESSAGE"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
