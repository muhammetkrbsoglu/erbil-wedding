"use client"

import { useState, useEffect } from "react"
import { Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface AccessibilityIssue {
  type: "error" | "warning" | "info"
  category: string
  description: string
  element?: string
  suggestion: string
}

export function AccessibilityValidator() {
  const [issues, setIssues] = useState<AccessibilityIssue[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === "development")
  }, [])

  const scanAccessibility = async () => {
    setIsScanning(true)
    const foundIssues: AccessibilityIssue[] = []

    // Check for missing alt attributes
    const imagesWithoutAlt = document.querySelectorAll("img:not([alt])")
    imagesWithoutAlt.forEach((img) => {
      foundIssues.push({
        type: "error",
        category: "Images",
        description: "Image missing alt attribute",
        element: img.tagName.toLowerCase(),
        suggestion: "Add descriptive alt text for screen readers",
      })
    })

    // Check for empty alt attributes on decorative images
    const imagesWithEmptyAlt = document.querySelectorAll('img[alt=""]')
    if (imagesWithEmptyAlt.length > 0) {
      foundIssues.push({
        type: "info",
        category: "Images",
        description: `${imagesWithEmptyAlt.length} images with empty alt (decorative)`,
        suggestion: "Ensure these are truly decorative images",
      })
    }

    // Check for missing form labels
    const inputsWithoutLabels = document.querySelectorAll("input:not([aria-label]):not([aria-labelledby])")
    const inputsWithLabels = document.querySelectorAll("input + label, label input")
    const unlabeledInputs = Array.from(inputsWithoutLabels).filter(
      (input) => !Array.from(inputsWithLabels).some((labeled) => labeled.contains(input)),
    )

    unlabeledInputs.forEach((input) => {
      foundIssues.push({
        type: "error",
        category: "Forms",
        description: "Input missing label or aria-label",
        element: `${input.tagName.toLowerCase()}[type="${(input as HTMLInputElement).type}"]`,
        suggestion: "Add a label element or aria-label attribute",
      })
    })

    // Check for missing heading hierarchy
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    const headingLevels = Array.from(headings).map((h) => Number.parseInt(h.tagName.charAt(1)))

    if (headingLevels.length > 0) {
      const firstHeading = headingLevels[0]
      if (firstHeading !== 1) {
        foundIssues.push({
          type: "warning",
          category: "Headings",
          description: "Page doesn't start with h1",
          suggestion: "Start page with h1 for proper heading hierarchy",
        })
      }

      // Check for skipped heading levels
      for (let i = 1; i < headingLevels.length; i++) {
        const current = headingLevels[i]
        const previous = headingLevels[i - 1]
        if (current > previous + 1) {
          foundIssues.push({
            type: "warning",
            category: "Headings",
            description: `Heading level skipped (h${previous} to h${current})`,
            suggestion: "Don't skip heading levels for proper document structure",
          })
        }
      }
    }

    // Check for buttons without accessible names
    const buttonsWithoutNames = document.querySelectorAll(
      "button:not([aria-label]):not([aria-labelledby]):empty, button:not([aria-label]):not([aria-labelledby])[title='']",
    )
    buttonsWithoutNames.forEach((button) => {
      foundIssues.push({
        type: "error",
        category: "Interactive",
        description: "Button without accessible name",
        element: "button",
        suggestion: "Add text content, aria-label, or aria-labelledby",
      })
    })

    // Check for links without accessible names
    const linksWithoutNames = document.querySelectorAll(
      "a:not([aria-label]):not([aria-labelledby]):empty, a:not([aria-label]):not([aria-labelledby])[title='']",
    )
    linksWithoutNames.forEach((link) => {
      foundIssues.push({
        type: "error",
        category: "Interactive",
        description: "Link without accessible name",
        element: "a",
        suggestion: "Add text content, aria-label, or aria-labelledby",
      })
    })

    // Check for color contrast (basic check)
    const textElements = document.querySelectorAll("p, span, div, h1, h2, h3, h4, h5, h6")
    let lowContrastCount = 0

    textElements.forEach((element) => {
      const styles = getComputedStyle(element)
      const color = styles.color
      const backgroundColor = styles.backgroundColor

      // Basic contrast check (would need more sophisticated implementation)
      if (color && backgroundColor && color !== "rgba(0, 0, 0, 0)" && backgroundColor !== "rgba(0, 0, 0, 0)") {
        // Simplified contrast check
        const colorLuminance = getLuminance(color)
        const bgLuminance = getLuminance(backgroundColor)
        const contrast = (Math.max(colorLuminance, bgLuminance) + 0.05) / (Math.min(colorLuminance, bgLuminance) + 0.05)

        if (contrast < 4.5) {
          lowContrastCount++
        }
      }
    })

    if (lowContrastCount > 0) {
      foundIssues.push({
        type: "warning",
        category: "Color",
        description: `${lowContrastCount} elements may have low color contrast`,
        suggestion: "Ensure text has sufficient contrast ratio (4.5:1 minimum)",
      })
    }

    // Check for keyboard navigation
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    if (focusableElements.length === 0) {
      foundIssues.push({
        type: "warning",
        category: "Keyboard",
        description: "No focusable elements found",
        suggestion: "Ensure interactive elements are keyboard accessible",
      })
    }

    setIssues(foundIssues)
    setIsScanning(false)
  }

  // Simplified luminance calculation
  const getLuminance = (color: string): number => {
    // This is a very basic implementation
    // In a real app, you'd want a proper color parsing and luminance calculation
    return 0.5 // Placeholder
  }

  const getIssueIcon = (type: AccessibilityIssue["type"]) => {
    switch (type) {
      case "error":
        return "🔴"
      case "warning":
        return "🟡"
      case "info":
        return "🔵"
    }
  }

  const getIssueBadge = (type: AccessibilityIssue["type"]) => {
    switch (type) {
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
      case "info":
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-4 left-4 z-50 max-w-md">
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Accessibility</span>
          </CardTitle>
          <Button size="sm" onClick={scanAccessibility} disabled={isScanning}>
            {isScanning ? "Scanning..." : "Scan Issues"}
          </Button>
        </CardHeader>
        <CardContent className="max-h-96 overflow-y-auto">
          {issues.length === 0 ? (
            <p className="text-sm text-muted-foreground">No issues found or scan not run yet.</p>
          ) : (
            <div className="space-y-3">
              {issues.map((issue, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span>{getIssueIcon(issue.type)}</span>
                      <span className="font-medium text-sm">{issue.category}</span>
                    </div>
                    {getIssueBadge(issue.type)}
                  </div>
                  <p className="text-sm text-foreground mb-1">{issue.description}</p>
                  {issue.element && <p className="text-xs text-muted-foreground mb-2">Element: {issue.element}</p>}
                  <p className="text-xs text-muted-foreground italic">{issue.suggestion}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
