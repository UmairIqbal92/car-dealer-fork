"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Car, FolderOpen, MessageSquare, FileText, LogOut, Plus, Menu, X, LayoutDashboard, Edit, Trash2, Eye, Settings } from "lucide-react"

interface Vehicle {
  id: number
  name: string
  year: number
  price: number
  make: string
  model: string
  mileage: number
  status: string
  featured: boolean
  images: string[]
}

export default function AdminVehiclesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
        fetchVehicles()
      }
    } catch (err) {
      router.push("/admin/login")
    }
  }

  const fetchVehicles = async () => {
    try {
      const res = await fetch("/api/vehicles")
      const data = await res.json()
      setVehicles(data.vehicles || [])
    } catch (err) {
      console.error("Error fetching vehicles:", err)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return
    
    try {
      await fetch(`/api/vehicles/${id}`, { method: "DELETE" })
      fetchVehicles()
    } catch (err) {
      console.error("Error deleting vehicle:", err)
    }
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
        <div className="flex items-center justify-between mb-8">
          <button className="lg:hidden p-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h2 className="text-2xl font-bold text-black">Vehicles</h2>
          <Link
            href="/admin/vehicles/new"
            className="flex items-center gap-2 bg-[#EC3827] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#d42f1f] transition-colors"
          >
            <Plus size={20} />
            Add Vehicle
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black">Vehicle</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black">Year</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black">Mileage</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-black">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {vehicles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No vehicles found. Click "Add Vehicle" to create your first listing.
                    </td>
                  </tr>
                ) : (
                  vehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden">
                            {vehicle.images?.[0] ? (
                              <img src={vehicle.images[0]} alt={vehicle.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Car size={20} className="text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-black">{vehicle.make} {vehicle.model}</p>
                            <p className="text-sm text-gray-500">{vehicle.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{vehicle.year}</td>
                      <td className="px-6 py-4 font-semibold text-black">${vehicle.price?.toLocaleString()}</td>
                      <td className="px-6 py-4 text-gray-700">{vehicle.mileage?.toLocaleString()} mi</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          vehicle.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {vehicle.status || 'available'}
                        </span>
                        {vehicle.featured && (
                          <span className="ml-2 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/vehicles/${vehicle.id}`}
                            target="_blank"
                            className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                          >
                            <Eye size={18} />
                          </Link>
                          <Link
                            href={`/admin/vehicles/${vehicle.id}`}
                            className="p-2 text-gray-500 hover:text-[#EC3827] transition-colors"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(vehicle.id)}
                            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
