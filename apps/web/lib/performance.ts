import React from "react"
// Performance monitoring utilities
export class PerformanceTracker {
  private static instance: PerformanceTracker
  private metrics: Map<string, number> = new Map()

  static getInstance(): PerformanceTracker {
    if (!PerformanceTracker.instance) {
      PerformanceTracker.instance = new PerformanceTracker()
    }
    return PerformanceTracker.instance
  }

  // Track Core Web Vitals
  trackCLS() {
    if (typeof window !== "undefined" && "web-vital" in window) {
      // Track Cumulative Layout Shift
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "layout-shift" && !(entry as any).hadRecentInput) {
            this.metrics.set("CLS", (this.metrics.get("CLS") || 0) + (entry as any).value)
          }
        }
      }).observe({ type: "layout-shift", buffered: true })
    }
  }

  trackLCP() {
    if (typeof window !== "undefined") {
      // Track Largest Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        this.metrics.set("LCP", lastEntry.startTime)
      }).observe({ type: "largest-contentful-paint", buffered: true })
    }
  }

  trackFID() {
    if (typeof window !== "undefined") {
      // Track First Input Delay
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.set("FID", (entry as any).processingStart - entry.startTime)
        }
      }).observe({ type: "first-input", buffered: true })
    }
  }

  // Custom performance tracking
  startTiming(label: string) {
    if (typeof window !== "undefined") {
      performance.mark(`${label}-start`)
    }
  }

  endTiming(label: string) {
    if (typeof window !== "undefined") {
      performance.mark(`${label}-end`)
      performance.measure(label, `${label}-start`, `${label}-end`)

      const measure = performance.getEntriesByName(label)[0]
      this.metrics.set(label, measure.duration)
    }
  }

  getMetrics() {
    return Object.fromEntries(this.metrics)
  }

  // Report metrics to analytics
  reportMetrics() {
    const metrics = this.getMetrics()

    // Send to analytics service
    if (typeof window !== "undefined" && window.gtag) {
      Object.entries(metrics).forEach(([name, value]) => {
        window.gtag("event", "performance_metric", {
          metric_name: name,
          metric_value: Math.round(value),
        })
      })
    }
  }
}

// Bundle size optimization utilities
export function loadComponentLazy<T>(importFn: () => Promise<{ default: T }>, fallback?: React.ComponentType) {
  return React.lazy(async () => {
    const start = performance.now()
    const module = await importFn()
    const end = performance.now()

    PerformanceTracker.getInstance().metrics.set(`lazy-load-${module.default.name || "component"}`, end - start)

    return module
  })
}
