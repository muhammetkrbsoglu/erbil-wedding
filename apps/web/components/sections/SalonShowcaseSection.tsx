"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { SalonCard } from "../cards/SalonCard"
import { getSalons } from "@/lib/api"
import { Button } from "../ui/button"
import { FadeInUp } from "@/components/ui/animation-wrapper"
import { staggerContainer, staggerItem, scaleOnHover } from "@/lib/animations"

export const SalonShowcaseSection = async () => {
  const salons = await getSalons()

  return (
    <section id="salonlar" className="py-20 md:py-24 bg-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title with Premium Animation */}
        <FadeInUp className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
              Hayallerinize Ev Sahipliği Yapacak{" "}
              <motion.span
                className="text-accent relative inline-block"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                Salonlarımız
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent/40 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </motion.span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Her biri özenle tasarlanmış salonlarımızda mükemmel düğün deneyimi yaşayın
            </motion.p>
          </motion.div>
        </FadeInUp>

        {/* Salon Cards with Stagger Animation */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {salons.slice(0, 3).map((salon, index) => (
            <motion.div key={salon.id} variants={staggerItem} whileHover="hover" className="group">
              <motion.div variants={scaleOnHover} className="h-full">
                <SalonCard salon={salon} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button with Hover Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center"
        >
          <Link href="/salonlar">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white transition-all duration-300 shadow-lg hover:shadow-xl btn-luxury px-8 py-4 text-lg font-semibold"
              >
                <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  Tüm Salonları Gör
                </motion.span>
                <motion.svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
