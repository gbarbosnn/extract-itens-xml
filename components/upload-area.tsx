"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload } from "lucide-react"

interface UploadAreaProps {
  onFileSelect: (file: File) => void
  isLoading: boolean
}

export function UploadArea({ onFileSelect, isLoading }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.name.endsWith(".xml")) {
        onFileSelect(file)
      } else {
        alert("Por favor, selecione um arquivo XML")
      }
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      onFileSelect(files[0])
    }
  }

  const handleClick = () => {
    if (!isLoading) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400 bg-gray-50"
      } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".xml"
        onChange={handleFileInputChange}
        className="hidden"
        disabled={isLoading}
      />

      <div className="flex flex-col items-center gap-3">
        <Upload className="w-12 h-12 text-gray-400" />
        <div>
          <p className="text-lg font-semibold text-gray-700">Arraste o XML aqui ou clique para selecionar</p>
          <p className="text-sm text-gray-500 mt-1">Apenas arquivos .xml são aceitos</p>
        </div>
      </div>
    </div>
  )
}
