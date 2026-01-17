"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Car, FolderOpen, MessageSquare, FileText, LogOut, Plus, Menu, X, LayoutDashboard, Edit, Trash2, Check, Settings, Upload, Loader2 } from "lucide-react"

interface Category {
  id: number
  name: string
  slug: string
  logo: string | null
}

export default function AdminCategoriesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [newCategory, setNewCategory] = useState("")
  const [newLogo, setNewLogo] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState("")
  const [editingLogo, setEditingLogo] = useState("")
  const [uploading, setUploading] = useState(false)
  const [editUploading, setEditUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editFileInputRef = useRef<HTMLInputElement>(null)

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
        fetchCategories()
      }
    } catch (err) {
      router.push("/admin/login")
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

  const handleCreate = async () => {
    if (!newCategory.trim()) return
    
    try {
      await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory.trim(), logo: newLogo.trim() || null })
      })
      setNewCategory("")
      setNewLogo("")
      fetchCategories()
    } catch (err) {
      console.error("Error creating category:", err)
    }
  }

  const handleUpdate = async (id: number) => {
    if (!editingName.trim()) return
    
    try {
      await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingName.trim(), logo: editingLogo.trim() || null })
      })
      setEditingId(null)
      setEditingName("")
      setEditingLogo("")
      fetchCategories()
    } catch (err) {
      console.error("Error updating category:", err)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return
    
    try {
      await fetch(`/api/categories/${id}`, { method: "DELETE" })
      fetchCategories()
    } catch (err) {
      console.error("Error deleting category:", err)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  const handleFileUpload = async (file: File, isEdit: boolean = false) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }
    
    if (isEdit) {
      setEditUploading(true)
    } else {
      setUploading(true)
    }
    
    try {
      const response = await fetch("/api/uploads/request-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: file.name,
          size: file.size,
          contentType: file.type,
        }),
      })
      
      if (!response.ok) throw new Error("Failed to get upload URL")
      
      const { uploadURL, objectPath } = await response.json()
      
      const uploadResponse = await fetch(uploadURL, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      })
      
      if (!uploadResponse.ok) throw new Error("Upload failed")
      
      if (isEdit) {
        setEditingLogo(objectPath)
      } else {
        setNewLogo(objectPath)
      }
    } catch (err) {
      alert("Failed to upload image")
    } finally {
      if (isEdit) {
        setEditUploading(false)
      } else {
        setUploading(false)
      }
    }
  }

  const getImageUrl = (path: string) => {
    if (path.startsWith("/objects/")) {
      return `/api${path}`
    }
    return path
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
    { href: "/admin/categories", icon: FolderOpen, label: "Categories", active: true },
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
          <h2 className="text-2xl font-bold text-black">Categories</h2>
          <div></div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-black mb-4">Add New Category (Brand)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Brand name (e.g., Toyota, Ford)..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
            />
            <div className="flex items-center gap-2">
              {newLogo ? (
                <div className="flex items-center gap-2">
                  <img src={getImageUrl(newLogo)} alt="Logo preview" className="h-10 w-auto object-contain border rounded" />
                  <button
                    type="button"
                    onClick={() => setNewLogo("")}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                  {uploading ? "Uploading..." : "Upload Logo"}
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], false)}
                className="hidden"
              />
            </div>
            <button
              onClick={handleCreate}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#C74B3F] text-white rounded-lg hover:bg-[#b33f35] transition-colors"
            >
              <Plus size={20} />
              Add Brand
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-black">Logo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-black">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-black">Slug</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-black">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    No categories found. Add your first brand above.
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {category.logo ? (
                        <img src={getImageUrl(category.logo)} alt={category.name} className="h-10 w-auto object-contain" />
                      ) : (
                        <span className="text-gray-400 text-sm">No logo</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === category.id ? (
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          placeholder="Brand name"
                          className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC3827] w-full"
                          autoFocus
                        />
                      ) : (
                        <span className="font-semibold text-black">{category.name}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === category.id ? (
                        <div className="flex items-center gap-2">
                          {editingLogo ? (
                            <div className="flex items-center gap-2">
                              <img src={getImageUrl(editingLogo)} alt="Logo preview" className="h-8 w-auto object-contain border rounded" />
                              <button type="button" onClick={() => setEditingLogo("")} className="p-1 text-red-500 hover:text-red-700">
                                <X size={14} />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => editFileInputRef.current?.click()}
                              disabled={editUploading}
                              className="flex items-center gap-1 px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                            >
                              {editUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                              {editUploading ? "..." : "Upload"}
                            </button>
                          )}
                          <input
                            ref={editFileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], true)}
                            className="hidden"
                          />
                        </div>
                      ) : (
                        <span className="text-gray-500">{category.slug}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {editingId === category.id ? (
                          <>
                            <button
                              onClick={() => handleUpdate(category.id)}
                              className="p-2 text-green-600 hover:text-green-700 transition-colors"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={() => { setEditingId(null); setEditingName(""); setEditingLogo("") }}
                              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                              <X size={18} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => { setEditingId(category.id); setEditingName(category.name); setEditingLogo(category.logo || "") }}
                              className="p-2 text-gray-500 hover:text-[#EC3827] transition-colors"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(category.id)}
                              className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
