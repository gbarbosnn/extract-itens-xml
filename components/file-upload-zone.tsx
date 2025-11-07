"use client"

import type React from "react"
import { useRef } from "react"
import { Upload } from "lucide-react"

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function FileUploadZone({ onFileSelect, fileInputRef, onFileInputChange }: FileUploadZoneProps) {
  const dragOverRef = useRef(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    dragOverRef.current = true
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    dragOverRef.current = false
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    dragOverRef.current = false

    const files = e.dataTransfer.files
    if (files.length > 0) {
      onFileSelect(files[0])
    }
  }

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all"
        style={{
          borderColor: "#0045B5",
          backgroundColor: "#F8F7F5",
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="space-y-3">
          <div className="flex justify-center">
            <Upload className="w-10 h-10" style={{ color: "#0045B5" }} />
          </div>
          <div>
            <p className="font-semibold text-foreground">Clique ou arraste o arquivo XML</p>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".xml"
        onChange={onFileInputChange}
        className="hidden"
        aria-label="Upload arquivo XML"
      />
    </>
  )
}
