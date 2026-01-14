"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Car, FolderOpen, MessageSquare, FileText, LogOut, Menu, X, LayoutDashboard, ChevronDown, ChevronUp, Settings } from "lucide-react"

interface Application {
  id: number
  buyer_data: any
  co_buyer_data: any
  vehicle_name: string
  vehicle_year: number
  status: string
  created_at: string
}

export default function AdminApplicationsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [applications, setApplications] = useState<Application[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedId, setExpandedId] = useState<number | null>(null)

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
        fetchApplications()
      }
    } catch (err) {
      router.push("/admin/login")
    }
  }

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/applications")
      const data = await res.json()
      setApplications(data.applications || [])
    } catch (err) {
      console.error("Error fetching applications:", err)
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
    { href: "/admin/inquiries", icon: MessageSquare, label: "Inquiries" },
    { href: "/admin/applications", icon: FileText, label: "Applications", active: true },
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
          <h2 className="text-2xl font-bold text-black">Credit Applications</h2>
          <div></div>
        </div>

        <div className="grid gap-4">
          {applications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center text-gray-500">
              No applications yet.
            </div>
          ) : (
            applications.map((app) => {
              const buyer = typeof app.buyer_data === 'string' ? JSON.parse(app.buyer_data) : app.buyer_data
              const coBuyer = app.co_buyer_data ? (typeof app.co_buyer_data === 'string' ? JSON.parse(app.co_buyer_data) : app.co_buyer_data) : null
              
              return (
                <div key={app.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-black">
                          {buyer.firstName} {buyer.lastName}
                        </h3>
                        {app.vehicle_name && (
                          <p className="text-[#EC3827] font-semibold">
                            Interested in: {app.vehicle_year} {app.vehicle_name}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(app.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          app.status === 'approved' ? 'bg-green-100 text-green-700' :
                          app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {app.status}
                        </span>
                        {expandedId === app.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                  </div>
                  
                  {expandedId === app.id && (
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-black mb-3">Buyer Information</h4>
                          <div className="space-y-2 text-sm">
                            <p><span className="text-gray-500">Email:</span> {buyer.email}</p>
                            <p><span className="text-gray-500">Phone:</span> {buyer.cellPhone}</p>
                            <p><span className="text-gray-500">Address:</span> {buyer.streetAddress}, {buyer.city}, {buyer.state} {buyer.zipCode}</p>
                            <p><span className="text-gray-500">Employer:</span> {buyer.employerName}</p>
                            <p><span className="text-gray-500">Monthly Income:</span> ${buyer.monthlyGrossIncome}</p>
                          </div>
                        </div>
                        
                        {coBuyer && (
                          <div>
                            <h4 className="font-bold text-black mb-3">Co-Buyer Information</h4>
                            <div className="space-y-2 text-sm">
                              <p><span className="text-gray-500">Name:</span> {coBuyer.firstName} {coBuyer.lastName}</p>
                              <p><span className="text-gray-500">Email:</span> {coBuyer.email}</p>
                              <p><span className="text-gray-500">Phone:</span> {coBuyer.cellPhone}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </main>
    </div>
  )
}
