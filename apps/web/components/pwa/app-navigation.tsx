"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, Heart, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Venues", href: "/salonlar", icon: Calendar },
  { name: "About", href: "/hakkimizda", icon: Heart },
  { name: "Contact", href: "/iletisim", icon: Phone },
]

export function AppNavigation() {
  const [isInstalled, setIsInstalled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Check if app is installed (running in standalone mode)
    setIsInstalled(window.matchMedia("(display-mode: standalone)").matches)
  }, [])

  // Only show app navigation when installed as PWA
  if (!isInstalled) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border">
      <div className="flex items-center justify-around px-2 py-2 safe-area-bottom">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200",
                "min-w-[60px] min-h-[60px] touch-target",
                isActive ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
