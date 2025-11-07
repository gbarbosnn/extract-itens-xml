"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import FileUploadZone from "@/components/file-upload-zone"
import { processarXML, gerarExcel } from "@/lib/xml-processor"
import { Download } from "lucide-react"
import Image from "next/image"

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.name.endsWith(".xml")) {
      setFile(selectedFile)
      setError(null)
      setIsSuccess(false)
    } else {
      setError("Por favor, selecione um arquivo XML válido")
      setFile(null)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      handleFileSelect(selectedFile)
    }
  }

  const processXML = async () => {
    if (!file) return

    setIsProcessing(true)
    setError(null)

    try {
      const fileContent = await file.text()
      const produtosFormatted = processarXML(fileContent)
      gerarExcel(produtosFormatted)
      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao processar arquivo XML")
      setIsSuccess(false)
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadExcel = () => {
    if (!file) return

    ;(async () => {
      setIsProcessing(true)
      setError(null)
      try {
        const content = await file.text()
        const produtos = processarXML(content)
        gerarExcel(produtos)
        setIsSuccess(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao gerar arquivo Excel")
        setIsSuccess(false)
      } finally {
        setIsProcessing(false)
      }
    })()
  }

  const resetForm = () => {
    setFile(null)
    setIsSuccess(false)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border/40">
        <div className="max-w-md mx-auto px-6 py-12 items-center">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Image src="./logo.png" height={40} width={40} alt="logo" />
              <h1 className="text-4xl font-bold" style={{ color: "#0045B5" }}>
                XML para Excel
              </h1>
            </div>
          </div>
            <p className="text-sm text-muted-foreground mt-2 text-center">Extraia os produtos do seu XML em segundos</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-4">
        <div className="space-y-8">
          <FileUploadZone
            onFileSelect={handleFileSelect}
            fileInputRef={fileInputRef}
            onFileInputChange={handleFileInputChange}
          />

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200/40">
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          {isProcessing && (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="flex gap-1.5">
                <div
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{ backgroundColor: "#FDC300", animationDelay: "0ms" }}
                />
                <div
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{ backgroundColor: "#FDC300", animationDelay: "150ms" }}
                />
                <div
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{ backgroundColor: "#FDC300", animationDelay: "300ms" }}
                />
              </div>
              <p className="text-sm text-muted-foreground">Processando...</p>
            </div>
          )}

          {isSuccess && !isProcessing && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200/40">
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  Arquivo processado com sucesso!
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={downloadExcel}
                  size="lg"
                  className="flex-1 text-white font-semibold gap-2"
                  style={{ backgroundColor: "#FDC300" }}
                >
                  <Download className="w-4 h-4" />
                  Download Excel
                </Button>
                <Button onClick={resetForm} variant="outline" size="lg" className="px-6 bg-transparent">
                  Nova Conversão
                </Button>
              </div>
            </div>
          )}

          {file && (
            <div>
              <span>Arquivo selecionado: <strong>{file.name}</strong></span>
            </div>
          )}


          {!isSuccess && file && !isProcessing && (
            <div className="flex gap-3">
              <Button
                onClick={processXML}
                size="lg"
                className="flex-1 text-white font-semibold"
                style={{ backgroundColor: "#0045B5" }}
              >
                Processar XML
              </Button>
              <Button onClick={resetForm} variant="outline" size="lg" className="px-6 bg-transparent">
                Limpar
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
