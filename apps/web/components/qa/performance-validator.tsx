"use client"

import { useState, useEffect } from "react"
import { Activity, Zap, ImageIcon, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PerformanceMetrics {
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
  fcp: number // First Contentful Paint
  ttfb: number // Time to First Byte
  loadTime: number
  domNodes: number
  imageCount: number
  jsSize: number
  cssSize: number
}

export function PerformanceValidator() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === "development")

    if (typeof window !== "undefined") {
      collectMetrics()
    }
  }, [])

  // Replaced collectMetrics implementation with a TypeScript-safe version
  const collectMetrics = async () => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined
    if (!navigation) return

    const resources = performance.getEntriesByType("resource") as PerformanceEntry[]

    // Calculate metrics
    const loadTime = navigation.loadEventEnd - navigation.fetchStart
    const ttfb = navigation.responseStart - navigation.requestStart
    const domNodes = document.querySelectorAll("*").length

    const isResourceTiming = (r: PerformanceEntry): r is PerformanceResourceTiming => {
      return (r as PerformanceResourceTiming).initiatorType !== undefined
    }

    const images = resources.filter((r): r is PerformanceResourceTiming => isResourceTiming(r) && r.initiatorType === "img")
    const scripts = resources.filter((r): r is PerformanceResourceTiming => isResourceTiming(r) && r.initiatorType === "script")
    const styles = resources.filter((r): r is PerformanceResourceTiming => isResourceTiming(r) && r.initiatorType === "link")

    const jsSize = scripts.reduce((total: number, script: PerformanceResourceTiming) => total + (script.transferSize || 0), 0)
    const cssSize = styles.reduce((total: number, style: PerformanceResourceTiming) => total + (style.transferSize || 0), 0)

    // Web Vitals (simplified - would need proper implementation)
    let lcp = 0
    const fid = 0
    const cls = 0
    const fcp = 0

    // LCP
    if (typeof PerformanceObserver !== "undefined") {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1] as PerformanceEntry | undefined
          if (lastEntry && (lastEntry as any).startTime !== undefined) {
            lcp = (lastEntry as any).startTime || 0
          }
        })
        // @ts-ignore - observe options type may vary across TS lib versions
        lcpObserver.observe({ type: "largest-contentful-paint", buffered: true })
      } catch (e) {
        // Fallback
        lcp = loadTime
      }
    }

    setMetrics({
      lcp,
      fid,
      cls,
      fcp,
      ttfb,
      loadTime,
      domNodes,
      imageCount: images.length,
      jsSize: Math.round(jsSize / 1024), // KB
      cssSize: Math.round(cssSize / 1024), // KB
    })
  }

  const getScoreColor = (score: number, thresholds: { good: number; needs: number }) => {
    if (score <= thresholds.good) return "text-green-600"
    if (score <= thresholds.needs) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number, thresholds: { good: number; needs: number }) => {
    if (score <= thresholds.good) return <Badge className="bg-green-100 text-green-800">Good</Badge>
    if (score <= thresholds.needs) return <Badge className="bg-yellow-100 text-yellow-800">Needs Work</Badge>
    return <Badge className="bg-red-100 text-red-800">Poor</Badge>
  }

  if (!isVisible || !metrics) return null

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Core Web Vitals */}
          <div>
            <h4 className="font-medium text-sm mb-2">Core Web Vitals</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs">LCP</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${getScoreColor(metrics.lcp, { good: 2500, needs: 4000 })}`}>
                    {Math.round(metrics.lcp)}ms
                  </span>
                  {getScoreBadge(metrics.lcp, { good: 2500, needs: 4000 })}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">FID</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${getScoreColor(metrics.fid, { good: 100, needs: 300 })}`}>
                    {Math.round(metrics.fid)}ms
                  </span>
                  {getScoreBadge(metrics.fid, { good: 100, needs: 300 })}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">CLS</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${getScoreColor(metrics.cls, { good: 0.1, needs: 0.25 })}`}>
                    {metrics.cls.toFixed(3)}
                  </span>
                  {getScoreBadge(metrics.cls, { good: 0.1, needs: 0.25 })}
                </div>
              </div>
            </div>
          </div>

          {/* Load Metrics */}
          <div>
            <h4 className="font-medium text-sm mb-2 flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Load Times</span>
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs">Total Load</span>
                <span className={`text-xs ${getScoreColor(metrics.loadTime, { good: 3000, needs: 5000 })}`}>
                  {Math.round(metrics.loadTime)}ms
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">TTFB</span>
                <span className={`text-xs ${getScoreColor(metrics.ttfb, { good: 200, needs: 500 })}`}>
                  {Math.round(metrics.ttfb)}ms
                </span>
              </div>
            </div>
          </div>

          {/* Resource Metrics */}
          <div>
            <h4 className="font-medium text-sm mb-2 flex items-center space-x-1">
              <Zap className="w-4 h-4" />
              <span>Resources</span>
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs">DOM Nodes</span>
                <span className={`text-xs ${getScoreColor(metrics.domNodes, { good: 1500, needs: 3000 })}`}>
                  {metrics.domNodes}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Images</span>
                <ImageIcon className="w-4 h-4" />
                <span className="text-xs">{metrics.imageCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">JS Size</span>
                <span className={`text-xs ${getScoreColor(metrics.jsSize, { good: 200, needs: 500 })}`}>
                  {metrics.jsSize}KB
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">CSS Size</span>
                <span className={`text-xs ${getScoreColor(metrics.cssSize, { good: 100, needs: 200 })}`}>
                  {metrics.cssSize}KB
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
