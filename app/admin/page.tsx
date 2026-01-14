"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Car, FolderOpen, MessageSquare, FileText, LogOut, Plus, Menu, X, LayoutDashboard, Settings } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ vehicles: 0, categories: 0, inquiries: 0, applications: 0 })
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    checkAuth()
    fetchStats()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/check")
      if (!res.ok) {
        router.push("/admin/login")
      } else {
        setLoading(false)
      }
    } catch (err) {
      router.push("/admin/login")
    }
  }

  const fetchStats = async () => {
    try {
      const [vehiclesRes, categoriesRes, inquiriesRes, applicationsRes] = await Promise.all([
        fetch("/api/vehicles"),
        fetch("/api/categories"),
        fetch("/api/inquiries"),
        fetch("/api/applications"),
      ])
      
      const [vehiclesData, categoriesData, inquiriesData, applicationsData] = await Promise.all([
        vehiclesRes.json(),
        categoriesRes.json(),
        inquiriesRes.json(),
        applicationsRes.json(),
      ])
      
      setStats({
        vehicles: vehiclesData.vehicles?.length || 0,
        categories: categoriesData.categories?.length || 0,
        inquiries: inquiriesData.inquiries?.length || 0,
        applications: applicationsData.applications?.length || 0,
      })
    } catch (err) {
      console.error("Error fetching stats:", err)
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
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard", active: true },
    { href: "/admin/vehicles", icon: Car, label: "Vehicles" },
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
          <h2 className="text-2xl font-bold text-black">Dashboard</h2>
          <Link
            href="/admin/vehicles/new"
            className="flex items-center gap-2 bg-[#EC3827] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#d42f1f] transition-colors"
          >
            <Plus size={20} />
            Add Vehicle
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Car size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Vehicles</p>
                <p className="text-3xl font-bold text-black">{stats.vehicles}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FolderOpen size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Categories</p>
                <p className="text-3xl font-bold text-black">{stats.categories}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <MessageSquare size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Inquiries</p>
                <p className="text-3xl font-bold text-black">{stats.inquiries}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Applications</p>
                <p className="text-3xl font-bold text-black">{stats.applications}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-black mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/admin/vehicles/new" className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="font-semibold text-black">Add New Vehicle</span>
                <p className="text-sm text-gray-500">Create a new car listing</p>
              </Link>
              <Link href="/admin/categories" className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="font-semibold text-black">Manage Categories</span>
                <p className="text-sm text-gray-500">Add or edit vehicle categories</p>
              </Link>
              <Link href="/admin/inquiries" className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="font-semibold text-black">View Inquiries</span>
                <p className="text-sm text-gray-500">Check customer inquiries</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-black mb-4">System Info</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Database Status</span>
                <span className="text-green-600 font-semibold">Connected</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Email Service</span>
                <span className="text-green-600 font-semibold">Active</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Last Updated</span>
                <span className="text-gray-800 font-semibold">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
