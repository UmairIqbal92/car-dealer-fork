"use client"

import { useState, useRef } from "react"
import { Upload, X, Loader2, Plus } from "lucide-react"

interface MultiImageUploaderProps {
  value: string[]
  onChange: (urls: string[]) => void
  maxImages?: number
  label?: string
}

export default function MultiImageUploader({ 
  value = [], 
  onChange, 
  maxImages = 10,
  label = "Upload Images" 
}: MultiImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const remainingSlots = maxImages - value.length
    if (remainingSlots <= 0) {
      setError(`Maximum ${maxImages} images allowed`)
      return
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots)

    for (const file of filesToUpload) {
      if (!file.type.startsWith("image/")) {
        setError("Please select only image files")
        continue
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("Each file must be less than 10MB")
        continue
      }
    }

    setIsUploading(true)
    setError(null)

    const uploadedPaths: string[] = []

    for (const file of filesToUpload) {
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

        if (!response.ok) {
          throw new Error("Failed to get upload URL")
        }

        const { uploadURL, objectPath } = await response.json()

        const uploadResponse = await fetch(uploadURL, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        })

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload file")
        }

        uploadedPaths.push(objectPath)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed")
      }
    }

    if (uploadedPaths.length > 0) {
      onChange([...value, ...uploadedPaths])
    }

    setIsUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRemove = (index: number) => {
    const newValue = value.filter((_, i) => i !== index)
    onChange(newValue)
  }

  const getImageUrl = (path: string) => {
    if (path.startsWith("/objects/")) {
      return `/api${path}`
    }
    return path
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {value.map((url, index) => (
          <div key={index} className="relative group">
            <img
              src={getImageUrl(url)}
              alt={`Image ${index + 1}`}
              className="w-full h-24 object-cover rounded-lg border"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        
        {value.length < maxImages && (
          <div
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
              isUploading ? "border-gray-300 bg-gray-50" : "border-gray-300 hover:border-[#C74B3F] hover:bg-gray-50"
            }`}
          >
            {isUploading ? (
              <Loader2 className="w-6 h-6 text-[#C74B3F] animate-spin" />
            ) : (
              <>
                <Plus className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-400 mt-1">Add</span>
              </>
            )}
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
        disabled={isUploading}
      />

      <p className="text-xs text-gray-400">
        {value.length}/{maxImages} images uploaded. Max 10MB each.
      </p>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
