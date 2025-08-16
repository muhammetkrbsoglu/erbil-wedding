"use client"

import type React from "react"

import { useState } from "react"
import { Phone, MessageCircle, Calendar, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobileExperience } from "./mobile-experience-provider"

interface MobileCTAAction {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  onClick?: () => void
  variant: "default" | "secondary" | "outline"
  haptic?: boolean
}

const ctaActions: MobileCTAAction[] = [
  {
    id: "call",
    label: "Hemen Ara",
    icon: Phone,
    href: "tel:+905551234567",
    variant: "default",
    haptic: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/905551234567",
    variant: "secondary",
    haptic: true,
  },
  {
    id: "booking",
    label: "Randevu Al",
    icon: Calendar,
    href: "/randevu-talep-et",
    variant: "outline",
  },
  {
    id: "favorites",
    label: "Favoriler",
    icon: Heart,
    variant: "outline",
    onClick: () => {
      // Toggle favorites functionality
    },
  },
]

export function MobileCTASection() {
  const [activeAction, setActiveAction] = useState<string | null>(null)
  const { isMobile, safeAreaInsets } = useMobileExperience()

  const handleActionClick = (action: MobileCTAAction) => {
    setActiveAction(action.id)

    // Haptic feedback
    if (action.haptic && "vibrate" in navigator) {
      navigator.vibrate(10)
    }

    // Execute action
    if (action.onClick) {
      action.onClick()
    }

    // Reset active state
    setTimeout(() => setActiveAction(null), 150)
  }

  if (!isMobile) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border/50 shadow-xl"
      style={{ paddingBottom: safeAreaInsets.bottom }}
    >
      <div className="px-4 py-3">
        <div className="grid grid-cols-2 gap-3">
          {ctaActions.map((action) => {
            const Icon = action.icon
            const isActive = activeAction === action.id

            const buttonContent = (
              <div
                className={cn(
                  "flex items-center justify-center space-x-2 transition-all duration-200",
                  isActive && "scale-95",
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{action.label}</span>
              </div>
            )

            if (action.href) {
              return (
                <Button
                  key={action.id}
                  variant={action.variant}
                  size="lg"
                  className="touch-target h-12"
                  asChild
                  onClick={() => handleActionClick(action)}
                >
                  <a href={action.href} target={action.href.startsWith("http") ? "_blank" : undefined}>
                    {buttonContent}
                  </a>
                </Button>
              )
            }

            return (
              <Button
                key={action.id}
                variant={action.variant}
                size="lg"
                className="touch-target h-12"
                onClick={() => handleActionClick(action)}
              >
                {buttonContent}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
