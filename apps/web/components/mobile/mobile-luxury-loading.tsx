"use client"

import { useState, useEffect } from "react"

interface MobileLuxuryLoadingProps {
  isLoading: boolean
  message?: string
  progress?: number
}

export function MobileLuxuryLoading({ isLoading, message = "Loading...", progress }: MobileLuxuryLoadingProps) {
  const [dots, setDots] = useState("")

  useEffect(() => {
    if (!isLoading) return

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 500)

    return () => clearInterval(interval)
  }, [isLoading])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="text-center space-y-6 px-8">
        {/* Luxury Loading Animation */}
        <div className="relative">
          <div className="w-16 h-16 mx-auto">
            {/* Outer ring */}
            <div className="absolute inset-0 border-4 border-accent/20 rounded-full" />

            {/* Animated ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-accent rounded-full animate-spin" />

            {/* Inner pulse */}
            <div className="absolute inset-2 bg-accent/10 rounded-full animate-pulse" />

            {/* Center dot */}
            <div className="absolute inset-6 bg-accent rounded-full" />
          </div>

          {/* Progress ring (if progress provided) */}
          {progress !== undefined && (
            <svg className="absolute inset-0 w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-accent/20"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="text-accent transition-all duration-300"
                style={{
                  strokeDasharray: `${2 * Math.PI * 28}`,
                  strokeDashoffset: `${2 * Math.PI * 28 * (1 - progress / 100)}`,
                }}
              />
            </svg>
          )}
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h3 className="text-lg font-playfair font-semibold text-foreground">
            {message}
            <span className="inline-block w-8 text-left">{dots}</span>
          </h3>

          {progress !== undefined && <p className="text-sm text-muted-foreground">{Math.round(progress)}% complete</p>}
        </div>

        {/* Luxury Brand Message */}
        <div className="pt-4 border-t border-border/20">
          <p className="text-xs text-muted-foreground font-medium tracking-wide uppercase">Erbil Wedding</p>
          <p className="text-xs text-muted-foreground mt-1">Creating unforgettable moments</p>
        </div>
      </div>
    </div>
  )
}

// Hook for managing loading states
export function useLuxuryLoading() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("Loading...")
  const [progress, setProgress] = useState<number | undefined>(undefined)

  const startLoading = (loadingMessage?: string, withProgress?: boolean) => {
    setIsLoading(true)
    if (loadingMessage) setMessage(loadingMessage)
    if (withProgress) setProgress(0)
  }

  const updateProgress = (newProgress: number) => {
    setProgress(Math.min(100, Math.max(0, newProgress)))
  }

  const stopLoading = () => {
    setIsLoading(false)
    setProgress(undefined)
  }

  return {
    isLoading,
    message,
    progress,
    startLoading,
    updateProgress,
    stopLoading,
    LoadingComponent: () => <MobileLuxuryLoading isLoading={isLoading} message={message} progress={progress} />,
  }
}
