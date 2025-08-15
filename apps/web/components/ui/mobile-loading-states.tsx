"use client"

import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface MobileLoadingProps {
  variant?: "spinner" | "skeleton" | "dots" | "pulse"
  size?: "sm" | "md" | "lg"
  className?: string
  text?: string
}

export function MobileLoading({ variant = "spinner", size = "md", className, text }: MobileLoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  if (variant === "spinner") {
    return (
      <div className={cn("flex flex-col items-center justify-center space-y-2", className)}>
        <Loader2 className={cn("animate-spin text-accent", sizeClasses[size])} />
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
    )
  }

  if (variant === "skeleton") {
    return (
      <div className={cn("space-y-3", className)}>
        <div className="h-4 bg-muted animate-pulse rounded" />
        <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
        <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
      </div>
    )
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center justify-center space-x-1", className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn("bg-accent rounded-full animate-pulse", sizeClasses[size])}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1s",
            }}
          />
        ))}
        {text && <p className="ml-3 text-sm text-muted-foreground">{text}</p>}
      </div>
    )
  }

  if (variant === "pulse") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className={cn("bg-accent/20 rounded-full animate-ping", sizeClasses[size])} />
        {text && <p className="ml-3 text-sm text-muted-foreground">{text}</p>}
      </div>
    )
  }

  return null
}

// Skeleton components for different content types
export function VenueCardSkeleton() {
  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      <div className="h-64 bg-muted animate-pulse" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
        <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
        <div className="h-10 bg-muted animate-pulse rounded" />
      </div>
    </div>
  )
}

export function HeaderSkeleton() {
  return (
    <div className="h-16 bg-muted animate-pulse border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="h-8 w-32 bg-muted-foreground/20 animate-pulse rounded" />
        <div className="hidden md:flex space-x-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 w-16 bg-muted-foreground/20 animate-pulse rounded" />
          ))}
        </div>
        <div className="md:hidden h-6 w-6 bg-muted-foreground/20 animate-pulse rounded" />
      </div>
    </div>
  )
}
