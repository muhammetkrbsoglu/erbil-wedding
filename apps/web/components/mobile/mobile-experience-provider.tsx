"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { InstallPrompt } from "../pwa/install-prompt"
import { OfflineIndicator } from "../pwa/offline-indicator"
import { AppNavigation } from "../pwa/app-navigation"

interface MobileExperienceContextType {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  orientation: "portrait" | "landscape"
  viewportHeight: number
  viewportWidth: number
  safeAreaInsets: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

const MobileExperienceContext = createContext<MobileExperienceContextType | undefined>(undefined)

export function MobileExperienceProvider({ children }: { children: React.ReactNode }) {
  const [contextValue, setContextValue] = useState<MobileExperienceContextType>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    orientation: "portrait",
    viewportHeight: 0,
    viewportWidth: 0,
    safeAreaInsets: { top: 0, bottom: 0, left: 0, right: 0 },
  })

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const isDesktop = width >= 1024
      const orientation = width > height ? "landscape" : "portrait"

      // Get safe area insets (for devices with notches, etc.)
      const computedStyle = getComputedStyle(document.documentElement)
      const safeAreaInsets = {
        top: Number.parseInt(computedStyle.getPropertyValue("env(safe-area-inset-top)")) || 0,
        bottom: Number.parseInt(computedStyle.getPropertyValue("env(safe-area-inset-bottom)")) || 0,
        left: Number.parseInt(computedStyle.getPropertyValue("env(safe-area-inset-left)")) || 0,
        right: Number.parseInt(computedStyle.getPropertyValue("env(safe-area-inset-right)")) || 0,
      }

      setContextValue({
        isMobile,
        isTablet,
        isDesktop,
        orientation,
        viewportHeight: height,
        viewportWidth: width,
        safeAreaInsets,
      })

      // Update CSS custom properties for dynamic viewport units
      document.documentElement.style.setProperty("--vh", `${height * 0.01}px`)
      document.documentElement.style.setProperty("--vw", `${width * 0.01}px`)
    }

    updateViewport()
    window.addEventListener("resize", updateViewport)
    window.addEventListener("orientationchange", updateViewport)

    return () => {
      window.removeEventListener("resize", updateViewport)
      window.removeEventListener("orientationchange", updateViewport)
    }
  }, [])

  return (
    <MobileExperienceContext.Provider value={contextValue}>
      {children}

      {/* Mobile-specific overlays */}
      <InstallPrompt />
      <OfflineIndicator />
      <AppNavigation />
    </MobileExperienceContext.Provider>
  )
}

export function useMobileExperience() {
  const context = useContext(MobileExperienceContext)
  if (context === undefined) {
    throw new Error("useMobileExperience must be used within a MobileExperienceProvider")
  }
  return context
}
