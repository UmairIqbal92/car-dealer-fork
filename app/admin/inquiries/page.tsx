"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Car, FolderOpen, MessageSquare, FileText, LogOut, Menu, X, LayoutDashboard, Mail, Phone } from "lucide-react"

interface Inquiry {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  message: string
  vehicle_name: string
  vehicle_year: number
  inquiry_type: string
  status: string
  created_at: string
}

export default function AdminInquiriesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
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
        fetchInquiries()
      }
    } catch (err) {
      router.push("/admin/login")
    }
  }

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/inquiries")
      const data = await res.json()
      setInquiries(data.inquiries || [])
    } catch (err) {
      console.error("Error fetching inquiries:", err)
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
    { href: "/admin/vehicles", icon: Car, label: "Vehicles" },
    { href: "/admin/categories", icon: FolderOpen, label: "Categories" },
    { href: "/admin/inquiries", icon: MessageSquare, label: "Inquiries", active: true },
    { href: "/admin/applications", icon: FileText, label: "Applications" },
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
          <h2 className="text-2xl font-bold text-black">Inquiries</h2>
          <div></div>
        </div>

        <div className="grid gap-4">
          {inquiries.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center text-gray-500">
              No inquiries yet.
            </div>
          ) : (
            inquiries.map((inquiry) => (
              <div key={inquiry.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-black">
                        {inquiry.first_name} {inquiry.last_name}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        inquiry.inquiry_type === 'vehicle' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {inquiry.inquiry_type}
                      </span>
                    </div>
                    
                    {inquiry.vehicle_name && (
                      <p className="text-[#EC3827] font-semibold mb-2">
                        Interested in: {inquiry.vehicle_year} {inquiry.vehicle_name}
                      </p>
                    )}
                    
                    {inquiry.message && (
                      <p className="text-gray-700 mb-4">{inquiry.message}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <a href={`mailto:${inquiry.email}`} className="flex items-center gap-1 hover:text-[#EC3827]">
                        <Mail size={14} />
                        {inquiry.email}
                      </a>
                      <a href={`tel:${inquiry.phone}`} className="flex items-center gap-1 hover:text-[#EC3827]">
                        <Phone size={14} />
                        {inquiry.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    {new Date(inquiry.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
