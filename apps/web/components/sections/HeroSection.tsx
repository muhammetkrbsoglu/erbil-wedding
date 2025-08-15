"use client"

import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { heroTitle, heroSubtitle, staggerContainer, staggerItem } from "../../lib/animations"
import { useParallax } from "../../hooks/use-animation"

export function HeroSection() {
  const parallaxY = useParallax(0.5)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      {/* Parallax Background Elements */}
      <motion.div className="absolute inset-0 opacity-30" style={{ y: parallaxY }}>
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-secondary/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/15 rounded-full blur-2xl" />
      </motion.div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
          {/* Main Title with Elegant Animation */}
          <motion.h1
            variants={heroTitle}
            className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-foreground mb-6 leading-tight"
          >
            Hayalinizdeki Düğünü{" "}
            <motion.span
              className="text-accent relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Gerçeğe
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-accent/30 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
            </motion.span>{" "}
            Dönüştürün
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={heroSubtitle}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Lüks salonlarımızda, profesyonel ekibimizle birlikte unutulmaz anlar yaşayın. Her detayı özenle planlanmış
            mükemmel düğün deneyimi.
          </motion.p>

          {/* CTA Buttons with Stagger Animation */}
          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg font-semibold btn-luxury hover-lift"
              >
                Salonları Keşfet
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-8 py-4 text-lg font-semibold btn-luxury bg-transparent"
              >
                Ücretsiz Keşif
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-1 h-3 bg-accent/70 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 right-10 opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="w-16 h-16 border border-accent/30 rounded-lg" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-10 opacity-20"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="w-12 h-12 bg-secondary/40 rounded-full" />
      </motion.div>
    </section>
  )
}
