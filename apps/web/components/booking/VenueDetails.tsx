"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { Salon } from "@/lib/types"
import { Users, MapPin, Wifi, Car, Music, Camera } from "lucide-react"
import Image from "next/image"

interface VenueDetailsProps {
  venue: Salon | null
}

const iconMap: Record<string, any> = {
  WiFi: Wifi,
  Otopark: Car,
  "Ses Sistemi": Music,
  "Fotoğraf Çekimi": Camera,
}

export function VenueDetails({ venue }: VenueDetailsProps) {
  return (
    <div className="h-full overflow-y-auto">
      <AnimatePresence mode="wait">
        {venue ? (
          <motion.div
            key={venue.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Venue Image */}
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <Image src={venue.imageUrl || "/placeholder.svg"} alt={venue.name} fill className="object-cover" />
            </div>

            {/* Venue Info */}
            <div>
              <h2 className="text-2xl font-bold text-text mb-2">{venue.name}</h2>
              <div className="flex items-center gap-4 text-neutral mb-4">
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5" />
                  <span>{venue.capacity} kişi kapasiteli</span>
                </div>
                {venue.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-5 h-5" />
                    <span>{venue.location}</span>
                  </div>
                )}
              </div>

              {venue.description && <p className="text-neutral leading-relaxed mb-4">{venue.description}</p>}
            </div>

            {/* Features */}
            {venue.features && venue.features.length > 0 && (
              <div>
                <h3 className="font-semibold text-text mb-3">Özellikler</h3>
                <div className="grid grid-cols-2 gap-2">
                  {venue.features.map((feature, index) => {
                    const Icon = iconMap[feature] || Users
                    return (
                      <div key={index} className="flex items-center gap-2 text-sm text-neutral">
                        <Icon className="w-4 h-4 text-accent" />
                        <span>{feature}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Specifications */}
            {venue.specifications && (
              <div>
                <h3 className="font-semibold text-text mb-3">Teknik Özellikler</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral">Alan:</span>
                    <span className="text-text">{venue.specifications.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral">Tavan Yüksekliği:</span>
                    <span className="text-text">{venue.specifications.ceiling}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral">Otopark:</span>
                    <span className="text-text">{venue.specifications.parking}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Pricing */}
            {venue.price && (
              <div className="bg-primary/10 rounded-xl p-4">
                <h3 className="font-semibold text-text mb-2">Fiyat Aralığı</h3>
                <div className="text-2xl font-bold text-accent">
                  {typeof venue.price === "number" ? (
                    <>₺{venue.price.toLocaleString()}</>
                  ) : (
                    <>
                      ₺{venue.price.min.toLocaleString()} - ₺{venue.price.max.toLocaleString()}
                    </>
                  )}
                </div>
                <p className="text-sm text-neutral mt-1">
                  *Fiyatlar sezon ve etkinlik türüne göre değişiklik gösterebilir
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-full text-center"
          >
            <div>
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Salon Seçin</h3>
              <p className="text-neutral">Randevu talebinde bulunmak için önce bir salon seçin</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
