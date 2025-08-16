"use client"

import type React from "react"

import { useRef, useState } from "react"

interface GestureHandlerProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onPinch?: (scale: number) => void
  onDoubleTap?: () => void
  className?: string
  threshold?: number
}

export function GestureHandler({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinch,
  onDoubleTap,
  className,
  threshold = 50,
}: GestureHandlerProps) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)
  const [lastTap, setLastTap] = useState<number>(0)
  const [initialDistance, setInitialDistance] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Accept any touch-like object (React.Touch vs DOM Touch) and guard properties
  const getTouchDistance = (touch1?: any, touch2?: any) => {
    if (!touch1 || !touch2 || touch1.clientX == null || touch2.clientX == null) return 0
    return Math.sqrt(Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
  if (!e.touches || e.touches.length === 0) return
  const touch = e.touches[0]
  if (!touch) return
  setTouchEnd(null)
  setTouchStart({ x: touch.clientX, y: touch.clientY })

    // Handle pinch gesture
    if (e.touches.length === 2 && onPinch) {
      const distance = getTouchDistance(e.touches[0], e.touches[1])
      setInitialDistance(distance)
    }

    // Handle double tap
    if (onDoubleTap) {
      const now = Date.now()
      const timeDiff = now - lastTap
      if (timeDiff < 300 && timeDiff > 0) {
        onDoubleTap()
      }
      setLastTap(now)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
  if (!e.touches || e.touches.length === 0) return
  const touch = e.touches[0]
  if (!touch) return
  setTouchEnd({ x: touch.clientX, y: touch.clientY })

    // Handle pinch gesture
    if (e.touches.length === 2 && onPinch && initialDistance > 0) {
      const t0 = e.touches[0]
      const t1 = e.touches[1]
      if (t0 && t1) {
        const currentDistance = getTouchDistance(t0, t1)
        const scale = currentDistance / initialDistance
        onPinch(scale)
      }
    }
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isLeftSwipe = distanceX > threshold
    const isRightSwipe = distanceX < -threshold
    const isUpSwipe = distanceY > threshold
    const isDownSwipe = distanceY < -threshold

    // Determine primary direction
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      // Horizontal swipe
      if (isLeftSwipe && onSwipeLeft) {
        onSwipeLeft()
      } else if (isRightSwipe && onSwipeRight) {
        onSwipeRight()
      }
    } else {
      // Vertical swipe
      if (isUpSwipe && onSwipeUp) {
        onSwipeUp()
      } else if (isDownSwipe && onSwipeDown) {
        onSwipeDown()
      }
    }

    // Reset
    setInitialDistance(0)
  }

  return (
    <div
      ref={containerRef}
      className={className}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  )
}
