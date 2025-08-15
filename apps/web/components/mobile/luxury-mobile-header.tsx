"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobileExperience } from "./mobile-experience-provider"

const navigation = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Salonlarımız", href: "/salonlar" },
  { name: "Randevu Talep Et", href: "/randevu-talep-et" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "İletişim", href: "/iletisim" },
]

export function LuxuryMobileHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { isMobile, safeAreaInsets } = useMobileExperience()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border/50" : "bg-transparent",
        )}
        style={{ paddingTop: safeAreaInsets.top }}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className={cn(
                "text-2xl font-playfair font-bold transition-all duration-300",
                scrolled ? "text-foreground" : "text-white drop-shadow-lg",
                "hover:scale-105 active:scale-95",
              )}
            >
              Erbil Wedding
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg",
                      "hover:bg-white/10 hover:backdrop-blur-sm",
                      isActive
                        ? scrolled
                          ? "bg-accent text-accent-foreground"
                          : "bg-white/20 text-white backdrop-blur-sm"
                        : scrolled
                          ? "text-foreground hover:text-accent"
                          : "text-white/90 hover:text-white",
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-2">
              {/* Quick Call Button */}
              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  "touch-target transition-all duration-300",
                  scrolled ? "text-foreground hover:bg-accent/10" : "text-white hover:bg-white/10 backdrop-blur-sm",
                )}
                asChild
              >
                <a href="tel:+905551234567" aria-label="Hemen Ara">
                  <Phone className="w-5 h-5" />
                </a>
              </Button>

              {/* Favorites (if implemented) */}
              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  "touch-target transition-all duration-300 md:hidden",
                  scrolled ? "text-foreground hover:bg-accent/10" : "text-white hover:bg-white/10 backdrop-blur-sm",
                )}
              >
                <Heart className="w-5 h-5" />
              </Button>

              {/* Mobile Menu Button */}
              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  "md:hidden touch-target transition-all duration-300",
                  scrolled ? "text-foreground hover:bg-accent/10" : "text-white hover:bg-white/10 backdrop-blur-sm",
                )}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menüyü Aç"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 transition-transform duration-200" />
                ) : (
                  <Menu className="w-6 h-6 transition-transform duration-200" />
                )}
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ paddingTop: safeAreaInsets.top + 64 }} // Header height + safe area
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />

          {/* Menu Content */}
          <div className="relative bg-background/95 backdrop-blur-md border-b border-border/50 shadow-xl">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 text-lg font-medium rounded-xl transition-all duration-300",
                      "touch-target mobile-transition",
                      isActive
                        ? "bg-accent text-accent-foreground shadow-sm"
                        : "text-foreground hover:bg-accent/10 hover:text-accent active:scale-95",
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}

              {/* Quick Actions */}
              <div className="pt-4 border-t border-border/20">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    className="touch-target justify-start bg-transparent"
                    variant="outline"
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <a href="tel:+905551234567">
                      <Phone className="w-4 h-4 mr-2" />
                      Hemen Ara
                    </a>
                  </Button>
                  <Button
                    className="touch-target justify-start bg-transparent"
                    variant="outline"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Favoriler
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
