"use client"

import type React from "react"

import { createContext, useContext } from "react"
import { usePathname } from "next/navigation"

interface SEOContextType {
  updatePageSEO: (seo: PageSEO) => void
}

interface PageSEO {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  noindex?: boolean
}

const SEOContext = createContext<SEOContextType | undefined>(undefined)

export function SEOProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const updatePageSEO = (seo: PageSEO) => {
    // Update document title
    if (seo.title) {
      document.title = `${seo.title} | Erbil Wedding`
    }

    // Update meta description
    if (seo.description) {
      let metaDescription = document.querySelector('meta[name="description"]')
      if (!metaDescription) {
        metaDescription = document.createElement("meta")
        metaDescription.setAttribute("name", "description")
        document.head.appendChild(metaDescription)
      }
      metaDescription.setAttribute("content", seo.description)
    }

    // Update canonical URL
    if (seo.canonical) {
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement("link")
        canonical.setAttribute("rel", "canonical")
        document.head.appendChild(canonical)
      }
      canonical.setAttribute("href", `https://erbilwedding.com${seo.canonical}`)
    }

    // Update robots meta
    if (seo.noindex) {
      let robots = document.querySelector('meta[name="robots"]')
      if (!robots) {
        robots = document.createElement("meta")
        robots.setAttribute("name", "robots")
        document.head.appendChild(robots)
      }
      robots.setAttribute("content", "noindex, nofollow")
    }
  }

  return <SEOContext.Provider value={{ updatePageSEO }}>{children}</SEOContext.Provider>
}

export function useSEO() {
  const context = useContext(SEOContext)
  if (context === undefined) {
    throw new Error("useSEO must be used within a SEOProvider")
  }
  return context
}
