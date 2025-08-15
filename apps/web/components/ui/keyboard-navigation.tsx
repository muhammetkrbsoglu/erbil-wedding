"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface KeyboardNavigationProps {
  onEnter?: () => void
  onEscape?: () => void
  onArrowUp?: () => void
  onArrowDown?: () => void
  onArrowLeft?: () => void
  onArrowRight?: () => void
  onTab?: () => void
  className?: string
  children: React.ReactNode
  focusable?: boolean
}

export function KeyboardNavigation({
  onEnter,
  onEscape,
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onTab,
  className,
  children,
  focusable = true,
}: KeyboardNavigationProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Enter":
          if (onEnter) {
            event.preventDefault()
            onEnter()
          }
          break
        case "Escape":
          if (onEscape) {
            event.preventDefault()
            onEscape()
          }
          break
        case "ArrowUp":
          if (onArrowUp) {
            event.preventDefault()
            onArrowUp()
          }
          break
        case "ArrowDown":
          if (onArrowDown) {
            event.preventDefault()
            onArrowDown()
          }
          break
        case "ArrowLeft":
          if (onArrowLeft) {
            event.preventDefault()
            onArrowLeft()
          }
          break
        case "ArrowRight":
          if (onArrowRight) {
            event.preventDefault()
            onArrowRight()
          }
          break
        case "Tab":
          if (onTab) {
            onTab()
          }
          break
      }
    }

    element.addEventListener("keydown", handleKeyDown)
    return () => element.removeEventListener("keydown", handleKeyDown)
  }, [onEnter, onEscape, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onTab])

  return (
    <div
      ref={ref}
      className={`${className} ${focusable ? "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2" : ""}`}
      tabIndex={focusable ? 0 : -1}
      role="button"
      aria-label="Klavye ile navigasyon yapılabilir"
    >
      {children}
    </div>
  )
}
