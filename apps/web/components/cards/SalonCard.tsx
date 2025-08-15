"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { MapPin, Users, Star } from "lucide-react"
import type { Salon } from "../../lib/types"

interface SalonCardProps {
  salon: Salon
}

export function SalonCard({ salon }: SalonCardProps) {
  if (!salon) {
    return null
  }

  const images = salon.images || (salon.gallery ?? [])
  const features = salon.features || []
  const name = salon.name || "Salon"
  const description = salon.description || ""
  const location = salon.location || "Konum belirtilmemiş"
  const capacity = salon.capacity || 0
  const rawPrice = salon.price ?? 0
  const price = typeof rawPrice === "number" ? rawPrice : (rawPrice?.min ?? rawPrice?.max ?? 0)

  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3, ease: "easeOut" }} className="group">
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
        <div className="relative overflow-hidden">
          <Image
            src={
              images[0] ||
              `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(name + " wedding venue") || "/placeholder.svg"}`
            }
            alt={name}
            width={400}
            height={300}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Price Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-accent/90 text-white border-0 px-3 py-1 text-sm font-semibold">
              ₺{Number(price).toLocaleString()}
            </Badge>
          </div>

          {/* Rating */}
          <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-800">4.9</span>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-playfair font-bold text-gray-900 mb-2 group-hover:text-accent transition-colors">
                {name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{capacity} kişi</span>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
              {features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200">
                  {feature}
                </Badge>
              ))}
              {features.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                  +{features.length - 3} daha
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
