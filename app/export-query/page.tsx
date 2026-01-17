"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingActions from "@/components/floating-actions"

interface QueryData {
  brand: string
  model: string
  budget: string
  miles: string
  email: string
  phone: string
  notes: string
}

export default function ExportQueryPage() {
  const [formData, setFormData] = useState<QueryData>({
    brand: "",
    model: "",
    budget: "",
    miles: "",
    email: "",
    phone: "",
    notes: ""
  })
  const [captchaAnswer, setCaptchaAnswer] = useState("")
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    generateCaptcha()
  }, [])

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCaptcha({ num1, num2, answer: num1 + num2 })
    setCaptchaAnswer("")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (parseInt(captchaAnswer) !== captcha.answer) {
      alert("Incorrect captcha answer. Please try again.")
      generateCaptcha()
      return
    }

    if (!formData.brand || !formData.model || !formData.miles || !formData.email || !formData.phone) {
      alert("Please fill in all required fields.")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/export-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ brand: "", model: "", budget: "", miles: "", email: "", phone: "", notes: "" })
        generateCaptcha()
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleExport = () => {
    const csvContent = `Brand,Model,Budget,Miles,Email,Phone,Notes\n${formData.brand},${formData.model},${formData.budget},${formData.miles},${formData.email},${formData.phone},"${formData.notes.replace(/"/g, '""')}"`
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "vehicle-query.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      const lines = text.split("\n")
      if (lines.length >= 2) {
        const values = lines[1].split(",")
        if (values.length >= 6) {
          setFormData({
            brand: values[0]?.trim() || "",
            model: values[1]?.trim() || "",
            budget: values[2]?.trim() || "",
            miles: values[3]?.trim() || "",
            email: values[4]?.trim() || "",
            phone: values[5]?.trim() || "",
            notes: values[6]?.replace(/^"|"$/g, "").replace(/""/g, '"') || ""
          })
        }
      }
    }
    reader.readAsText(file)
    e.target.value = ""
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <FloatingActions />

      <section className="py-16 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Export Query</h1>
          <p className="text-gray-600 text-center mb-8">Submit your vehicle inquiry or import/export your query data</p>

          <div className="flex gap-3 justify-center mb-8">
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              Export to CSV
            </button>
            <label className="px-4 py-2 bg-[#EC3827] text-white rounded-lg hover:bg-[#d63020] transition-colors text-sm font-medium cursor-pointer">
              Import from CSV
              <input type="file" accept=".csv" onChange={handleImport} className="hidden" />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="e.g. Toyota"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EC3827] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="e.g. Camry"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EC3827] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget (Optional)</label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="e.g. $15,000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EC3827] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Miles *</label>
                <input
                  type="text"
                  name="miles"
                  value={formData.miles}
                  onChange={handleChange}
                  placeholder="e.g. Under 50,000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EC3827] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EC3827] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(xxx) xxx-xxxx"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EC3827] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Any additional details about the vehicle you're looking for..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EC3827] focus:border-transparent resize-none"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Security Check: What is {captcha.num1} + {captcha.num2}? *
              </label>
              <input
                type="number"
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                placeholder="Your answer"
                className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EC3827] focus:border-transparent"
                required
              />
            </div>

            {submitStatus === "success" && (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center">
                Your query has been submitted successfully! We&apos;ll get back to you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center">
                Something went wrong. Please try again later.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#EC3827] text-white rounded-lg font-bold hover:bg-[#d63020] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Query"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
