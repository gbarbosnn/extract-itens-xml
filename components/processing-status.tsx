"use client"

export default function ProcessingStatus({ isProcessing }: { isProcessing: boolean }) {
  if (!isProcessing) return null

  return (
    <div className="flex items-center justify-center gap-2 p-4">
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      <p className="text-sm text-muted-foreground ml-2">Processando...</p>
    </div>
  )
}
