"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Car, FolderOpen, MessageSquare, FileText, LogOut, Menu, X, LayoutDashboard, ArrowLeft, Plus, Trash2, Settings } from "lucide-react"

interface Category {
  id: number
  name: string
}

export default function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    make: "",
    model: "",
    year: new Date().getFullYear(),
    price: "",
    mileage: "",
    color: "",
    bodyType: "",
    fuelType: "",
    transmission: "",
    drivetrain: "",
    engine: "",
    vin: "",
    stockNumber: "",
    categoryId: "",
    description: "",
    features: [] as string[],
    images: [] as string[],
    featured: false,
    status: "available"
  })
  const [newFeature, setNewFeature] = useState("")
  const [newImage, setNewImage] = useState("")

  const bodyTypes = ["Sedan", "SUV", "Truck", "Coupe", "Hatchback", "Van", "Convertible", "Wagon"]
  const fuelTypes = ["Gasoline", "Diesel", "Hybrid", "Electric"]
  const transmissions = ["Automatic", "Manual"]
  const drivetrains = ["FWD", "RWD", "AWD", "4WD"]
  const years = Array.from({ length: 76 }, (_, i) => new Date().getFullYear() - i + 1)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/check")
      if (!res.ok) {
        router.push("/admin/login")
      } else {
        setLoading(false)
        fetchVehicle()
        fetchCategories()
      }
    } catch (err) {
      router.push("/admin/login")
    }
  }

  const fetchVehicle = async () => {
    try {
      const res = await fetch(`/api/vehicles/${id}`)
      const data = await res.json()
      if (data.vehicle) {
        const v = data.vehicle
        setFormData({
          name: v.name || "",
          make: v.make || "",
          model: v.model || "",
          year: v.year || new Date().getFullYear(),
          price: v.price?.toString() || "",
          mileage: v.mileage?.toString() || "",
          color: v.color || "",
          bodyType: v.body_type || "",
          fuelType: v.fuel_type || "",
          transmission: v.transmission || "",
          drivetrain: v.drivetrain || "",
          engine: v.engine || "",
          vin: v.vin || "",
          stockNumber: v.stock_number || "",
          categoryId: v.category_id?.toString() || "",
          description: v.description || "",
          features: v.features || [],
          images: v.images || [],
          featured: v.featured || false,
          status: v.status || "available"
        })
      }
    } catch (err) {
      console.error("Error fetching vehicle:", err)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories")
      const data = await res.json()
      setCategories(data.categories || [])
    } catch (err) {
      console.error("Error fetching categories:", err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch(`/api/vehicles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price) || 0,
          mileage: parseInt(formData.mileage) || 0,
          categoryId: formData.categoryId ? parseInt(formData.categoryId) : null
        })
      })

      if (res.ok) {
        router.push("/admin/vehicles")
      } else {
        alert("Failed to update vehicle")
      }
    } catch (err) {
      console.error("Error updating vehicle:", err)
      alert("An error occurred")
    } finally {
      setSaving(false)
    }
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({ ...prev, features: [...prev.features, newFeature.trim()] }))
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }))
  }

  const addImage = () => {
    if (newImage.trim()) {
      setFormData(prev => ({ ...prev, images: [...prev.images, newImage.trim()] }))
      setNewImage("")
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#EC3827] border-t-transparent"></div>
      </div>
    )
  }

  const menuItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/vehicles", icon: Car, label: "Vehicles", active: true },
    { href: "/admin/categories", icon: FolderOpen, label: "Categories" },
    { href: "/admin/inquiries", icon: MessageSquare, label: "Inquiries" },
    { href: "/admin/applications", icon: FileText, label: "Applications" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-black text-white transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold">Car Junction</h1>
          <p className="text-gray-400 text-sm">Admin Panel</p>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.active ? 'bg-[#EC3827] text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <main className="flex-1 p-4 lg:p-8">
        <div className="flex items-center gap-4 mb-8">
          <button className="lg:hidden p-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link href="/admin/vehicles" className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h2 className="text-2xl font-bold text-black">Edit Vehicle</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-black mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Make *</label>
                <input
                  type="text"
                  value={formData.make}
                  onChange={(e) => setFormData(prev => ({ ...prev, make: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Model *</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Display Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Year *</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                  required
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Price ($) *</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Mileage</label>
                <input
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => setFormData(prev => ({ ...prev, mileage: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Category</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Color</label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Body Type</label>
                <select
                  value={formData.bodyType}
                  onChange={(e) => setFormData(prev => ({ ...prev, bodyType: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                >
                  <option value="">Select Body Type</option>
                  {bodyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Fuel Type</label>
                <select
                  value={formData.fuelType}
                  onChange={(e) => setFormData(prev => ({ ...prev, fuelType: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                >
                  <option value="">Select Fuel Type</option>
                  {fuelTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Transmission</label>
                <select
                  value={formData.transmission}
                  onChange={(e) => setFormData(prev => ({ ...prev, transmission: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                >
                  <option value="">Select Transmission</option>
                  {transmissions.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Drivetrain</label>
                <select
                  value={formData.drivetrain}
                  onChange={(e) => setFormData(prev => ({ ...prev, drivetrain: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                >
                  <option value="">Select Drivetrain</option>
                  {drivetrains.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Engine</label>
                <input
                  type="text"
                  value={formData.engine}
                  onChange={(e) => setFormData(prev => ({ ...prev, engine: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">VIN</label>
                <input
                  type="text"
                  value={formData.vin}
                  onChange={(e) => setFormData(prev => ({ ...prev, vin: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Stock Number</label>
                <input
                  type="text"
                  value={formData.stockNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, stockNumber: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                >
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="w-5 h-5"
                />
                <label htmlFor="featured" className="text-sm font-semibold text-black">Featured Vehicle</label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-black mb-4">Description</h3>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827] resize-none"
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-black mb-4">Features</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a feature..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-[#EC3827] text-white rounded-lg hover:bg-[#d42f1f] transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <span key={index} className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {feature}
                  <button type="button" onClick={() => removeFeature(index)} className="text-red-500 hover:text-red-700">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-black mb-4">Images (URLs)</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="url"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="Enter image URL..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827]"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
              />
              <button
                type="button"
                onClick={addImage}
                className="px-4 py-2 bg-[#EC3827] text-white rounded-lg hover:bg-[#d42f1f] transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img src={image} alt={`Vehicle ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link
              href="/admin/vehicles"
              className="px-6 py-3 border border-gray-300 text-black rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-[#EC3827] text-white rounded-lg font-semibold hover:bg-[#d42f1f] transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Update Vehicle"}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
