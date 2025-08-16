"use client"

import { useEffect, useRef, useState } from "react"

// Debounced scroll hook for performance
export function useDebounceScroll(delay = 16) {
  const [scrollY, setScrollY] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        setScrollY(window.scrollY)
      }, delay)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [delay])

  return scrollY
}

// Intersection Observer hook for lazy animations
export function useLazyAnimation(threshold = 0.1, rootMargin = "50px") {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true)
          setHasAnimated(true)
        }
      },
      { threshold, rootMargin },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin, hasAnimated])

  return { ref, isVisible, hasAnimated }
}

// Performance monitoring hook
export function usePerformanceMonitor() {
  const [fps, setFps] = useState(60)
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())

  useEffect(() => {
    let animationId: number

    const measureFPS = () => {
      frameCount.current++
      const currentTime = performance.now()

      if (currentTime - lastTime.current >= 1000) {
        setFps(frameCount.current)
        frameCount.current = 0
        lastTime.current = currentTime
      }

      animationId = requestAnimationFrame(measureFPS)
    }

    animationId = requestAnimationFrame(measureFPS)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return fps
}

// GPU acceleration utility
export function useGPUAcceleration(element: HTMLElement | null) {
  useEffect(() => {
    if (!element) return

    // Apply GPU acceleration styles
    element.style.transform = "translateZ(0)"
    element.style.willChange = "transform, opacity"
    element.style.backfaceVisibility = "hidden"
    element.style.perspective = "1000px"

    return () => {
      // Cleanup GPU acceleration when not needed
      element.style.willChange = "auto"
    }
  }, [element])
}
