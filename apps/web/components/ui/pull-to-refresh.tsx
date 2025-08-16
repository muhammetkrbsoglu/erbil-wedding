"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface PullToRefreshProps {
  children: React.ReactNode
  onRefresh: () => Promise<void>
  className?: string
  threshold?: number
}

export function PullToRefresh({ children, onRefresh, className, threshold = 80 }: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [canRefresh, setCanRefresh] = useState(false)
  const startY = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.scrollY === 0 && e.touches && e.touches.length > 0) {
      const t = e.touches[0]
      if (t) startY.current = t.clientY
    }
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (window.scrollY > 0 || isRefreshing) return

  if (!e.touches || e.touches.length === 0) return
  const t = e.touches[0]
  if (!t) return
  const currentY = t.clientY
      const distance = Math.max(0, currentY - startY.current)

      if (distance > 0) {
        e.preventDefault()
        setPullDistance(Math.min(distance, threshold * 1.5))
        setCanRefresh(distance >= threshold)
      }
    },
    [threshold, isRefreshing],
  )

  const handleTouchEnd = useCallback(async () => {
    if (canRefresh && !isRefreshing) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
      }
    }
    setPullDistance(0)
    setCanRefresh(false)
  }, [canRefresh, isRefreshing, onRefresh])

  const refreshProgress = Math.min(pullDistance / threshold, 1)
  const rotation = refreshProgress * 180

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull to refresh indicator */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 flex items-center justify-center",
          "bg-background/95 backdrop-blur-sm border-b transition-all duration-200",
          "z-10",
        )}
        style={{
          height: `${Math.min(pullDistance, threshold)}px`,
          opacity: pullDistance > 0 ? 1 : 0,
        }}
      >
        <div className="flex items-center space-x-2 text-muted-foreground">
          <RefreshCw
            className={cn(
              "h-5 w-5 transition-transform duration-200",
              isRefreshing && "animate-spin",
              canRefresh && !isRefreshing && "text-accent",
            )}
            style={{ transform: `rotate(${rotation}deg)` }}
          />
          <span className="text-sm font-medium">
            {isRefreshing ? "Refreshing..." : canRefresh ? "Release to refresh" : "Pull to refresh"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className="transition-transform duration-200"
        style={{
          transform: `translateY(${Math.min(pullDistance, threshold)}px)`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
