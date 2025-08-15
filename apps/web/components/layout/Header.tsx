"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonPress } from "@/lib/animations"

const navigation = [
  { name: "Ana Sayfa", href: "/" },
  {
    name: "Salonlarımız",
    href: "/salonlar",
    scrollTo: "salonlar-section",
    dropdown: [
      { name: "Tüm Salonlar", href: "/salonlar" },
      { name: "Düğün Salonları", href: "/salonlar?type=wedding" },
      { name: "Nişan Salonları", href: "/salonlar?type=engagement" },
      { name: "Toplantı Salonları", href: "/salonlar?type=meeting" },
    ],
  },
  { name: "Randevu Talep Et", href: "/randevu-talep-et" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "İletişim", href: "/iletisim" },
]

const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (element) {
    const headerHeight = 80
    const elementPosition = element.offsetTop - headerHeight

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    })
  }
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100

      setScrollProgress(progress)
      setIsScrolled(scrollTop > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (item: (typeof navigation)[0], e: React.MouseEvent) => {
    if (item.scrollTo && pathname === "/") {
      e.preventDefault()
      smoothScrollTo(item.scrollTo)
    }
  }

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName)
  }

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-background/80 backdrop-blur-sm border-b border-border/50",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-accent origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1 }}
      />

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Ana navigasyon">
        <div className="flex h-16 items-center justify-between">
          {/* Logo with Animation */}
          <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Link
              href="/"
              className="text-2xl font-playfair font-bold text-foreground hover:text-accent transition-colors duration-300 relative"
              aria-label="Erbil Wedding ana sayfa"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Erbil Wedding
              </motion.span>

              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation with Enhanced Animations */}
          <div className="hidden md:block">
            <motion.div
              className="ml-10 flex items-baseline space-x-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, staggerChildren: 0.1 }}
            >
              {navigation.map((item, index) => {
                const isActive = pathname === item.href
                const hasDropdown = item.dropdown && item.dropdown.length > 0

                return (
                  <div key={item.name} className="relative">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {hasDropdown ? (
                        <motion.button
                          className={cn(
                            "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg relative overflow-hidden",
                            isActive
                              ? "bg-accent text-white font-semibold shadow-lg"
                              : "text-foreground hover:text-accent hover:bg-accent/10",
                          )}
                          onClick={() => handleDropdownToggle(item.name)}
                          variants={buttonPress}
                          whileTap="tap"
                          whileHover={{ scale: 1.05 }}
                          aria-expanded={activeDropdown === item.name}
                        >
                          <span>{item.name}</span>
                          <motion.div
                            animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>

                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                          />
                        </motion.button>
                      ) : (
                        <motion.div variants={buttonPress} whileTap="tap">
                          <Link
                            href={item.href}
                            onClick={(e) => handleNavClick(item, e)}
                            className={cn(
                              "block px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg relative overflow-hidden",
                              isActive
                                ? "bg-accent text-white font-semibold shadow-lg"
                                : "text-foreground hover:text-accent hover:bg-accent/10",
                            )}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <motion.span whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                              {item.name}
                            </motion.span>

                            {!isActive && (
                              <motion.div
                                className="absolute bottom-1 left-3 right-3 h-0.5 bg-accent"
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                            )}
                          </Link>
                        </motion.div>
                      )}
                    </motion.div>

                    <AnimatePresence>
                      {hasDropdown && activeDropdown === item.name && (
                        <motion.div
                          className="absolute top-full left-0 mt-2 w-48 bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-xl overflow-hidden"
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        >
                          {item.dropdown?.map((dropdownItem, dropdownIndex) => (
                            <motion.div
                              key={dropdownItem.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: dropdownIndex * 0.05 }}
                            >
                              <Link
                                href={dropdownItem.href}
                                className="block px-4 py-3 text-sm text-foreground hover:text-accent hover:bg-accent/10 transition-all duration-200"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <motion.span whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                                  {dropdownItem.name}
                                </motion.span>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </motion.div>
          </div>

          {/* Mobile menu button with enhanced animation */}
          <div className="md:hidden">
            <motion.button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-foreground hover:bg-accent/10 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all duration-300"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              variants={buttonPress}
              whileTap="tap"
              whileHover={{ scale: 1.05 }}
            >
              <span className="sr-only">Ana menüyü aç</span>
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="block h-6 w-6" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation with Enhanced Animations */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden"
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div
                className="space-y-1 px-2 pb-3 pt-2 sm:px-3 bg-background/95 backdrop-blur-md rounded-lg mt-2 border border-border shadow-xl overflow-hidden"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {navigation.map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          handleNavClick(item, e)
                          setMobileMenuOpen(false)
                        }}
                        className={cn(
                          "block px-3 py-3 text-base font-medium transition-all duration-300 rounded-lg relative overflow-hidden",
                          isActive
                            ? "bg-accent text-white font-semibold shadow-lg"
                            : "text-foreground hover:text-accent hover:bg-accent/10",
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <motion.span whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                          {item.name}
                        </motion.span>

                        {!isActive && (
                          <motion.div
                            className="absolute left-0 top-0 bottom-0 w-1 bg-accent"
                            initial={{ scaleY: 0 }}
                            whileHover={{ scaleY: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
