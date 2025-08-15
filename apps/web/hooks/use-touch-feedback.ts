"use client"

import { useState, useCallback } from "react"

export function useTouchFeedback() {
  const [isPressed, setIsPressed] = useState(false)

  const handleTouchStart = useCallback(() => {
    setIsPressed(true)
  }, [])

  const handleTouchEnd = useCallback(() => {
    // Delay to show feedback before removing
    setTimeout(() => setIsPressed(false), 150)
  }, [])

  return {
    isPressed,
    handleTouchStart,
    handleTouchEnd,
  }
}
