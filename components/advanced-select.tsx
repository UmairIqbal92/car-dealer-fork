"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Search } from "lucide-react"

interface AdvancedSelectProps {
  options: string[] | number[]
  value: string | number
  onChange: (value: string) => void
  placeholder: string
  name: string
  required?: boolean
  searchable?: boolean
}

export default function AdvancedSelect({
  options,
  value,
  onChange,
  placeholder,
  name,
  required = false,
  searchable = true,
}: AdvancedSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filteredOptions = searchable
    ? options.filter((option) => option.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    : options

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (option: string | number) => {
    onChange(option.toString())
    setIsOpen(false)
    setSearchTerm("")
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#C74B3F] cursor-pointer hover:bg-gray-100 transition-colors"
      >
        <span className={value ? "text-black" : "text-gray-500"}>{value || placeholder}</span>
        <ChevronDown size={20} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-hidden">
          {searchable && options.length > 10 && (
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C74B3F]"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}
          <div className="max-h-52 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="w-full px-4 py-2 text-left hover:bg-red-50 hover:text-[#C74B3F] transition-colors text-black cursor-pointer"
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No results found</div>
            )}
          </div>
        </div>
      )}
      <input type="hidden" name={name} value={value} required={required} />
    </div>
  )
}
