"use client"

import { motion } from "framer-motion"
import type { Salon } from "@/lib/types"
import { Users, MapPin, Star } from "lucide-react"
import Image from "next/image"

interface VenueCardProps {
  venue: Salon
  isSelected: boolean
  onSelect: (venue: Salon) => void
}

export function VenueCard({ venue, isSelected, onSelect }: VenueCardProps) {
  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative cursor-pointer rounded-2xl overflow-hidden bg-white shadow-lg
        transition-all duration-300 hover:shadow-xl
        ${isSelected ? "ring-2 ring-accent shadow-accent/20" : ""}
      `}
      onClick={() => onSelect(venue)}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={venue.imageUrl || "/placeholder.svg"}
          alt={venue.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 w-6 h-6 bg-accent rounded-full flex items-center justify-center"
          >
            <Star className="w-3 h-3 text-white fill-current" />
          </motion.div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-text mb-2">{venue.name}</h3>

        <div className="flex items-center gap-4 text-sm text-neutral mb-3">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{venue.capacity} kişi</span>
          </div>
          {venue.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{venue.location}</span>
            </div>
          )}
        </div>

        {venue.price && (
          <div className="text-accent font-semibold">
            ₺{venue.price.min.toLocaleString()} - ₺{venue.price.max.toLocaleString()}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-3 py-2 bg-primary text-text rounded-lg font-medium hover:bg-secondary transition-colors"
        >
          Detayları Gör
        </motion.button>
      </div>
    </motion.div>
  )
}
