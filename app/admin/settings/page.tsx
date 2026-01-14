"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Car, FolderOpen, MessageSquare, FileText, LogOut, Menu, X, LayoutDashboard, Settings, Lock, Eye, EyeOff, Check } from "lucide-react"

export default function AdminSettingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [saving, setSaving] = useState(false)

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
      }
    } catch (err) {
      router.push("/admin/login")
    }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage({ type: "", text: "" })

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" })
      return
    }

    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters" })
      return
    }

    setSaving(true)

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await res.json()

      if (data.success) {
        setMessage({ type: "success", text: "Password changed successfully!" })
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        setMessage({ type: "error", text: data.error || "Failed to change password" })
      }
    } catch (err) {
      setMessage({ type: "error", text: "An error occurred. Please try again." })
    } finally {
      setSaving(false)
    }
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
    { href: "/admin/applications", icon: FileText, label: "Applications" },
    { href: "/admin/settings", icon: Settings, label: "Settings", active: true },
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
          <h2 className="text-2xl font-bold text-black">Settings</h2>
          <div></div>
        </div>

        <div className="max-w-xl">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#EC3827] rounded-full flex items-center justify-center">
                <Lock size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-black">Change Password</h3>
                <p className="text-gray-500 text-sm">Update your admin password</p>
              </div>
            </div>

            {message.text && (
              <div className={`mb-6 px-4 py-3 rounded-lg ${message.type === 'error' ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-700'}`}>
                <div className="flex items-center gap-2">
                  {message.type === 'success' && <Check size={18} />}
                  {message.text}
                </div>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827] focus:border-transparent"
                    placeholder="Enter current password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827] focus:border-transparent"
                    placeholder="Enter new password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-gray-500 text-xs mt-1">Minimum 6 characters</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827] focus:border-transparent"
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#EC3827] text-white py-3 rounded-lg font-bold hover:bg-[#d42f1f] transition-colors disabled:opacity-50"
              >
                {saving ? "Changing Password..." : "Change Password"}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
            <h3 className="text-lg font-bold text-black mb-4">Admin Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Username</span>
                <span className="font-semibold text-black">admin</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Session Status</span>
                <span className="text-green-600 font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
