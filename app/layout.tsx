import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { cn } from "@/lib/utils"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Toaster } from "@/components/ui/toaster"
import { SEOProvider } from "@/components/seo/seo-provider"
import { PerformanceMonitor } from "@/components/ui/performance-monitor"
import { MobileExperienceProvider } from "@/components/mobile/mobile-experience-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "Erbil Wedding - Luxury Wedding Venues in Turkey",
    template: "%s | Erbil Wedding",
  },
  description:
    "Discover Turkey's most elegant wedding venues. From intimate ceremonies to grand celebrations, find your perfect wedding location with Erbil Wedding.",
  keywords: [
    "wedding venues",
    "düğün salonları",
    "wedding halls",
    "Turkey weddings",
    "luxury venues",
    "wedding planning",
  ],
  authors: [{ name: "Erbil Wedding" }],
  creator: "Erbil Wedding",
  publisher: "Erbil Wedding",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://erbilwedding.com"),
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/tr",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://erbilwedding.com",
    siteName: "Erbil Wedding",
    title: "Erbil Wedding - Luxury Wedding Venues in Turkey",
    description:
      "Discover Turkey's most elegant wedding venues. From intimate ceremonies to grand celebrations, find your perfect wedding location.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Erbil Wedding - Luxury Wedding Venues",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Erbil Wedding - Luxury Wedding Venues in Turkey",
    description: "Discover Turkey's most elegant wedding venues. From intimate ceremonies to grand celebrations.",
    images: ["/og-image.jpg"],
    creator: "@erbilwedding",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#2E5339" }],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F6F4" },
    { media: "(prefers-color-scheme: dark)", color: "#36454F" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="/fonts/playfair-display-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Erbil Wedding",
              url: "https://erbilwedding.com",
              logo: "https://erbilwedding.com/logo.png",
              description: "Turkey's premier luxury wedding venue provider",
              address: {
                "@type": "PostalAddress",
                addressCountry: "TR",
                addressLocality: "Istanbul",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+90-XXX-XXX-XXXX",
                contactType: "customer service",
                availableLanguage: ["Turkish", "English"],
              },
              sameAs: [
                "https://www.facebook.com/ErbilWeddingDugunSalonu/",
                "https://www.instagram.com/erbilwedding?igsh=ZXFxeXRuanhuOThn",
                "https://twitter.com/erbilwedding",
              ],
            }),
          }}
        />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable, playfair.variable)}>
        <MobileExperienceProvider>
          <SEOProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster />
            </div>
            <PerformanceMonitor />
          </SEOProvider>
        </MobileExperienceProvider>
      </body>
    </html>
  )
}
