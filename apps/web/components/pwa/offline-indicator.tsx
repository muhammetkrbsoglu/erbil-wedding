"use client"

import { useState, useEffect } from "react"
import { Wifi, WifiOff } from "lucide-react"
import { cn } from "@/lib/utils"

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    const updateOnlineStatus = () => {
      const online = navigator.onLine
      setIsOnline(online)

      if (!online) {
        setShowIndicator(true)
      } else {
        // Hide indicator after 2 seconds when back online
        setTimeout(() => setShowIndicator(false), 2000)
      }
    }

    // Set initial status
    updateOnlineStatus()

    window.addEventListener("online", updateOnlineStatus)
    window.addEventListener("offline", updateOnlineStatus)

    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      window.removeEventListener("offline", updateOnlineStatus)
    }
  }, [])

  if (!showIndicator) return null

  return (
    <div
      className={cn(
        "fixed top-16 left-1/2 -translate-x-1/2 z-50",
        "px-4 py-2 rounded-full text-sm font-medium",
        "transition-all duration-300 transform",
        "shadow-lg backdrop-blur-sm",
        isOnline
          ? "bg-green-500/90 text-white animate-in slide-in-from-top-2"
          : "bg-red-500/90 text-white animate-in slide-in-from-top-2",
      )}
    >
      <div className="flex items-center space-x-2">
        {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
        <span>{isOnline ? "Back online" : "You're offline"}</span>
      </div>
    </div>
  )
}
