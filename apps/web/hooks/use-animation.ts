"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

// Hook for scroll-triggered animations
export function useScrollAnimation(threshold = 0.1, once = true) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: threshold, once })

  return { ref, isInView }
}

// Hook for staggered animations
export function useStaggerAnimation(itemCount: number, delay = 0.1) {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.1, once: true })

  useEffect(() => {
    if (isInView) {
      const timeouts: NodeJS.Timeout[] = []

      for (let i = 0; i < itemCount; i++) {
        const timeout = setTimeout(
          () => {
            setVisibleItems((prev) => [...prev, i])
          },
          i * delay * 1000,
        )

        timeouts.push(timeout)
      }

      return () => {
        timeouts.forEach(clearTimeout)
      }
    }
  }, [isInView, itemCount, delay])

  return { ref, visibleItems, isInView }
}

// Hook for parallax scrolling
export function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset * speed)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return offset
}

// Hook for reduced motion preference
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return prefersReducedMotion
}

// Hook for hover animations
export function useHoverAnimation() {
  const [isHovered, setIsHovered] = useState(false)

  const hoverProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  }

  return { isHovered, hoverProps }
}

// Hook for loading states
export function useLoadingAnimation(isLoading: boolean) {
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isLoading) {
      setShowLoading(true)
    } else {
      // Delay hiding loading to prevent flicker
      timeout = setTimeout(() => {
        setShowLoading(false)
      }, 300)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [isLoading])

  return showLoading
}
