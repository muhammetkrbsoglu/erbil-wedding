"use client"

import type React from "react"
import { Button } from "../ui/button"
import { MapPin, Navigation } from "lucide-react"

interface MapProps {
  center: { lat: number; lng: number }
  zoom: number
  className?: string
  showBusinessInfo?: boolean
  businessName?: string
  businessAddress?: string
  businessHours?: string[]
  businessPhone?: string
}

export const GoogleMap: React.FC<MapProps> = ({
  center,
  zoom,
  className = "",
  showBusinessInfo = false,
  businessName = "Erbil Wedding Düğün Salonları",
  businessAddress = "Bağdat Caddesi No: 123, Kadıköy, İstanbul 34710",
  businessHours = ["Pazartesi - Cuma: 09:00 - 18:00", "Cumartesi: 10:00 - 16:00", "Pazar: Kapalı"],
  businessPhone = "+90 (212) 555 0123",
}) => {
  return (
    <div className={`w-full h-full bg-wedding-secondary rounded-xl flex items-center justify-center ${className}`}>
      <div className="text-center p-8">
        <MapPin className="w-16 h-16 text-wedding-accent mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-wedding-text mb-2">{businessName}</h3>
        <p className="text-wedding-neutral mb-4">{businessAddress}</p>
        {showBusinessInfo && (
          <div className="space-y-2 mb-4">
            <p className="text-sm text-wedding-neutral">{businessPhone}</p>
            <div className="text-xs text-wedding-neutral">
              {businessHours.map((hour, index) => (
                <div key={index}>{hour}</div>
              ))}
            </div>
          </div>
        )}
        <p className="text-sm text-wedding-neutral mb-4">Google Maps entegrasyonu yakında aktif olacak</p>
        <DirectionsButton address={businessAddress} />
      </div>
    </div>
  )
}

export const DirectionsButton: React.FC<{ address: string; className?: string }> = ({ address, className = "" }) => {
  const handleGetDirections = () => {
    const url = `https://maps.google.com/dir/?api=1&destination=${encodeURIComponent(address)}`
    window.open(url, "_blank")
  }

  return (
    <Button
      onClick={handleGetDirections}
      className={`bg-wedding-accent hover:bg-wedding-accent/90 text-white ${className}`}
    >
      <Navigation className="w-4 h-4 mr-2" />
      Yol Tarifi Al
    </Button>
  )
}
