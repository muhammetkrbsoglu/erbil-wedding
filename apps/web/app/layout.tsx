import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Header } from "../components/layout/Header"
import { SEOProvider } from "../components/seo/seo-provider"
import { MobileExperienceProvider } from "../components/mobile/mobile-experience-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Erbil Wedding - Lüks Düğün Salonları",
  description: "İstanbul'un en seçkin düğün salonlarında hayalinizdeki düğünü gerçeğe dönüştürün.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body>
        <SEOProvider>
          <MobileExperienceProvider>
            <Header />
            <main>{children}</main>
          </MobileExperienceProvider>
        </SEOProvider>
      </body>
    </html>
  )
}
