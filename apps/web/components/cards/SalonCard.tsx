"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Users, MapPin, Star, Play } from "lucide-react"
import { Button } from "../ui/button"
import { cardHover, buttonPress } from "@/lib/animations"
import { useState } from "react"
import type { Salon } from "@/lib/types"

interface SalonCardProps {
  salon: Salon
  className?: string
}

export const SalonCard = ({ salon, className }: SalonCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [showVideoOverlay, setShowVideoOverlay] = useState(false)
  const { imageUrl, name, capacity, slug, location, rating, hasVideo } = salon

  return (
    <motion.div variants={cardHover} initial="rest" whileHover="hover" className={`group cursor-pointer ${className}`}>
      <Link href={`/salonlar/${slug}`} className="block">
        <motion.div className="bg-card border border-border rounded-2xl overflow-hidden animate-gpu">
          {/* Image Area with Video Overlay */}
          <div
            className="relative h-64 overflow-hidden"
            onMouseEnter={() => hasVideo && setShowVideoOverlay(true)}
            onMouseLeave={() => setShowVideoOverlay(false)}
          >
            {/* Loading Skeleton */}
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse" />
            )}

            {/* Main Image */}
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full h-full"
            >
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={`${name} - Elegant wedding venue interior`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                onLoad={() => setIsImageLoaded(true)}
              />

              {/* Gradient Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Video Play Button Overlay */}
            {hasVideo && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: showVideoOverlay ? 1 : 0,
                  scale: showVideoOverlay ? 1 : 0.8,
                }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <motion.button
                  className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-2xl"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault()
                    // Video modal açma logic'i buraya gelecek
                  }}
                >
                  <Play className="w-8 h-8 text-accent ml-1" fill="currentColor" />
                </motion.button>
              </motion.div>
            )}

            {/* Rating Badge */}
            {rating && (
              <motion.div
                className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold text-foreground">{rating}</span>
              </motion.div>
            )}
          </div>

          {/* Content Area */}
          <div className="p-6 space-y-4">
            {/* Salon Name */}
            <motion.h3
              className="text-xl font-playfair font-bold text-foreground leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {name}
            </motion.h3>

            {/* Info Row */}
            <motion.div
              className="flex items-center justify-between text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <Users size={16} className="text-accent" />
                <span>Maks. {capacity} Kişi</span>
              </div>

              {location && (
                <div className="flex items-center gap-1">
                  <MapPin size={16} className="text-accent" />
                  <span>{location}</span>
                </div>
              )}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div variants={buttonPress} whileTap="tap">
                <Button
                  variant="outline"
                  size="default"
                  className="w-full font-medium btn-luxury focus-luxury group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300 bg-transparent"
                >
                  <motion.span initial={{ x: 0 }} whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                    Detayları İncele
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Hover Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{
              opacity: 1,
              boxShadow: "0 0 30px rgba(var(--accent), 0.3)",
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}
