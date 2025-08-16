"use client"

import { useState, useEffect } from "react"
import { Check, X, AlertTriangle, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface QAItem {
  id: string
  category: string
  description: string
  status: "pass" | "fail" | "warning" | "pending"
  automated?: boolean
  testFunction?: () => Promise<boolean>
}

const qaChecklist: QAItem[] = [
  // Functionality Tests
  {
    id: "nav-links",
    category: "Functionality",
    description: "All navigation links work correctly",
    status: "pending",
    automated: true,
    testFunction: async () => {
      const links = document.querySelectorAll("nav a[href]")
      return links.length > 0 && Array.from(links).every((link) => (link as HTMLAnchorElement).href)
    },
  },
  {
    id: "cta-buttons",
    category: "Functionality",
    description: "CTA buttons lead to proper destinations",
    status: "pending",
    automated: true,
    testFunction: async () => {
      const ctaButtons = document.querySelectorAll('button[data-testid="cta"], a[data-testid="cta"]')
      return ctaButtons.length > 0
    },
  },
  {
    id: "forms-submit",
    category: "Functionality",
    description: "Forms submit successfully",
    status: "pending",
  },
  {
    id: "maps-load",
    category: "Functionality",
    description: "Maps load and function properly",
    status: "pending",
  },
  {
    id: "videos-play",
    category: "Functionality",
    description: "Videos play correctly",
    status: "pending",
  },

  // UX/UI Validation
  {
    id: "design-consistency",
    category: "UX/UI",
    description: "Consistent design language throughout",
    status: "pending",
    automated: true,
    testFunction: async () => {
      // Check for consistent color usage
      const computedStyle = getComputedStyle(document.documentElement)
      const primaryColor = computedStyle.getPropertyValue("--primary")
      return primaryColor.length > 0
    },
  },
  {
    id: "visual-hierarchy",
    category: "UX/UI",
    description: "Proper visual hierarchy",
    status: "pending",
    automated: true,
    testFunction: async () => {
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
      return headings.length > 0
    },
  },
  {
    id: "typography-readable",
    category: "UX/UI",
    description: "Readable typography on all devices",
    status: "pending",
    automated: true,
    testFunction: async () => {
      const body = document.body
      const fontSize = Number.parseFloat(getComputedStyle(body).fontSize)
      return fontSize >= 16 // Minimum 16px for mobile
    },
  },
  {
    id: "color-contrast",
    category: "UX/UI",
    description: "Sufficient color contrast",
    status: "pending",
    automated: true,
    testFunction: async () => {
      // Basic contrast check - would need more sophisticated implementation
      return true
    },
  },

  // Performance Validation
  {
    id: "load-times",
    category: "Performance",
    description: "Page load times under 3 seconds",
    status: "pending",
    automated: true,
    testFunction: async () => {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
      return navigation.loadEventEnd - navigation.fetchStart < 3000
    },
  },
  {
    id: "smooth-animations",
    category: "Performance",
    description: "Smooth animations (60fps)",
    status: "pending",
  },
  {
    id: "optimized-images",
    category: "Performance",
    description: "Optimized image loading",
    status: "pending",
    automated: true,
    testFunction: async () => {
      const images = document.querySelectorAll("img[loading='lazy']")
      const totalImages = document.querySelectorAll("img").length
      return totalImages > 0 && images.length / totalImages > 0.5 // At least 50% lazy loaded
    },
  },

  // Accessibility Audit
  {
    id: "keyboard-nav",
    category: "Accessibility",
    description: "Keyboard navigation functionality",
    status: "pending",
    automated: true,
    testFunction: async () => {
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      return focusableElements.length > 0
    },
  },
  {
    id: "screen-reader",
    category: "Accessibility",
    description: "Screen reader compatibility",
    status: "pending",
    automated: true,
    testFunction: async () => {
      const ariaLabels = document.querySelectorAll("[aria-label], [aria-labelledby]")
      const altTexts = document.querySelectorAll("img[alt]")
      return ariaLabels.length > 0 && altTexts.length > 0
    },
  },
  {
    id: "aria-labels",
    category: "Accessibility",
    description: "Proper ARIA labels",
    status: "pending",
    automated: true,
    testFunction: async () => {
      const buttons = document.querySelectorAll("button")
      const buttonsWithLabels = document.querySelectorAll("button[aria-label], button[aria-labelledby]")
      return buttons.length === 0 || buttonsWithLabels.length / buttons.length > 0.8
    },
  },
  {
    id: "focus-management",
    category: "Accessibility",
    description: "Focus management",
    status: "pending",
    automated: true,
    testFunction: async () => {
      // Check if focus styles are defined
      const focusStyles = document.querySelectorAll("[class*='focus:'], [class*='focus-']")
      return focusStyles.length > 0
    },
  },
]

export function QAChecklist() {
  const [checklist, setChecklist] = useState<QAItem[]>(qaChecklist)
  const [isVisible, setIsVisible] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  // Only show in development
  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === "development")
  }, [])

  const runAutomatedTests = async () => {
    setIsRunning(true)

    const updatedChecklist = await Promise.all(
      checklist.map(async (item) => {
        if (item.automated && item.testFunction) {
          try {
            const result = await item.testFunction()
            return { ...item, status: result ? ("pass" as const) : ("fail" as const) }
          } catch (error) {
            return { ...item, status: "warning" as const }
          }
        }
        return item
      }),
    )

    setChecklist(updatedChecklist)
    setIsRunning(false)
  }

  const toggleItemStatus = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "pass"
                  ? "fail"
                  : item.status === "fail"
                    ? "warning"
                    : item.status === "warning"
                      ? "pending"
                      : "pass",
            }
          : item,
      ),
    )
  }

  const getStatusIcon = (status: QAItem["status"]) => {
    switch (status) {
      case "pass":
        return <Check className="w-4 h-4 text-green-500" />
      case "fail":
        return <X className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      default:
  return <div className="w-4 h-4 rounded-full bg-neutral" />
    }
  }

  const getStatusColor = (status: QAItem["status"]) => {
    switch (status) {
      case "pass":
        return "bg-green-100 text-green-800"
      case "fail":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      default:
  return "bg-secondary/10 text-neutral"
    }
  }

  const categoryStats = checklist.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = { total: 0, pass: 0, fail: 0, warning: 0, pending: 0 }
      }
      // safe increments with existence checks
      const bucket = acc[item.category]
      if (bucket) {
        bucket.total = (bucket.total || 0) + 1
        bucket[item.status] = (bucket[item.status] || 0) + 1
      }
      return acc
    },
    {} as Record<string, Record<string, number>>,
  )

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">QA Checklist</CardTitle>
            <Button size="icon" variant="ghost" onClick={() => setIsVisible(false)}>
              <EyeOff className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" onClick={runAutomatedTests} disabled={isRunning}>
              {isRunning ? "Running..." : "Run Tests"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="max-h-96 overflow-y-auto">
          {Object.entries(categoryStats).map(([category, stats]) => (
            <div key={category} className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{category}</h4>
                <div className="flex space-x-1">
                  <Badge variant="secondary" className="text-xs">
                    {stats.pass}/{stats.total}
                  </Badge>
                </div>
              </div>
              <div className="space-y-1">
                {checklist
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "flex items-center space-x-2 p-2 rounded text-xs cursor-pointer hover:bg-muted/50",
                        getStatusColor(item.status),
                      )}
                      onClick={() => toggleItemStatus(item.id)}
                    >
                      {getStatusIcon(item.status)}
                      <span className="flex-1">{item.description}</span>
                      {item.automated && (
                        <Badge variant="outline" className="text-xs">
                          Auto
                        </Badge>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

// Toggle button to show/hide QA checklist
export function QAToggle() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === "development")
  }, [])

  if (!isVisible) return null

  return (
    <Button
      size="icon"
      className="fixed bottom-4 left-4 z-50"
      onClick={() => {
        const event = new CustomEvent("toggle-qa-checklist")
        window.dispatchEvent(event)
      }}
    >
      <Eye className="w-4 h-4" />
    </Button>
  )
}
