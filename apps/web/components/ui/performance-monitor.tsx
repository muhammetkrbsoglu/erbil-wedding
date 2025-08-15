"use client"

import { useEffect, useState } from "react"
import { usePerformanceMonitor } from "../../hooks/use-performance"

interface PerformanceMonitorProps {
  enabled?: boolean
  className?: string
}

export function PerformanceMonitor({ enabled = false, className }: PerformanceMonitorProps) {
  const fps = usePerformanceMonitor()
  const [memoryUsage, setMemoryUsage] = useState<number>(0)

  useEffect(() => {
    if (!enabled) return

    const updateMemoryUsage = () => {
      if ("memory" in performance) {
        const memory = (performance as any).memory
        setMemoryUsage(Math.round(memory.usedJSHeapSize / 1024 / 1024))
      }
    }

    const interval = setInterval(updateMemoryUsage, 1000)
    return () => clearInterval(interval)
  }, [enabled])

  if (!enabled) return null

  return (
    <div className={`performance-monitor ${className}`}>
      <div>FPS: {fps}</div>
      {memoryUsage > 0 && <div>Memory: {memoryUsage}MB</div>}
    </div>
  )
}
