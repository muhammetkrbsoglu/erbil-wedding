"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Users, MapPin, Star, Play } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"

interface Salon {
  id: string
  imageUrl?: string
  name: string
  capacity: number
  slug: string
  location?: string
  rating?: number
  hasVideo?: boolean
}

interface SalonCardProps {
  salon: Salon
  className?: string
  style?: React.CSSProperties
}

export const SalonCard = ({ salon, className, style }: SalonCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [showVideoOverlay, setShowVideoOverlay] = useState(false)
  const { imageUrl, name, capacity, slug, location, rating, hasVideo } = salon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group cursor-pointer ${className}`}
      style={style}
    >
      <Link href={`/salonlar/${slug}`} className="block">
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* Image Area */}
          <div
            className="relative h-64 overflow-hidden"
            onMouseEnter={() => hasVideo && setShowVideoOverlay(true)}
            onMouseLeave={() => setShowVideoOverlay(false)}
          >
            {/* Loading Skeleton */}
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
            )}

            {/* Main Image */}
            <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
              <Image
                src={imageUrl || "/placeholder.svg?height=256&width=400&query=elegant wedding venue"}
                alt={`${name} - Elegant wedding venue interior`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                onLoad={() => setIsImageLoaded(true)}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Video Play Button Overlay */}
            {hasVideo && showVideoOverlay && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-2xl hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-accent ml-1" fill="currentColor" />
                </button>
              </div>
            )}

            {/* Rating Badge */}
            {rating && (
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold">{rating}</span>
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="p-6 space-y-4">
            {/* Salon Name */}
            <h3 className="text-xl font-bold text-gray-900 leading-tight">{name}</h3>

            {/* Info Row */}
            <div className="flex items-center justify-between text-sm text-gray-600">
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
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Button
                variant="outline"
                size="default"
                className="w-full font-medium group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300 bg-transparent"
              >
                Detayları İncele
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
