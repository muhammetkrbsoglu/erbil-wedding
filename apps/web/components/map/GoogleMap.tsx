"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Navigation, Phone, Clock } from "lucide-react"

export function GoogleMap() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Card className="border-2 overflow-hidden border-secondary bg-primary">
      <div className="relative h-96 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
        {/* Mock Map Interface */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100" />
          <div className="absolute top-4 left-4 w-8 h-8 bg-red-500 rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <MapPin className="w-12 h-12 text-accent" />
          </div>
        </div>

        <div className="relative z-10 text-center p-6">
          <MapPin className="w-16 h-16 mx-auto mb-4 text-accent" />
          <h3 className="font-playfair text-2xl font-bold mb-2 text-text">
            Erbil Wedding
          </h3>
          <p className="mb-4 text-neutral">
            Yeşildere, Atakum/Samsun
          </p>
          <Button
            className="mb-4 bg-accent hover:bg-accent/90 text-text"
            onClick={() => setIsLoaded(true)}
          >
            <Navigation className="w-4 h-4 mr-2" />
            Haritayı Yükle
          </Button>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-accent" />
            <div>
              <p className="font-semibold text-text">
                Adres
              </p>
              <p className="text-sm text-neutral">
                Yeşildere, 550. Sk. No:8, 55200 Atakum/Samsun
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-accent" />
            <div>
              <p className="font-semibold text-text">
                Telefon
              </p>
              <p className="text-sm text-neutral">
                0552 800 39 39
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-secondary">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-accent" />
            <div>
              <p className="font-semibold text-text">
                Çalışma Saatleri
              </p>
              <p className="text-sm text-neutral">
                Pazartesi-Cuma: 09:00-18:00
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function DirectionsButton({ 
  address, 
  className = "" 
}: { 
  address?: string 
  className?: string 
}) {
  const handleDirections = () => {
    const defaultAddress = "Yeşildere, 550. Sk. No:8, 55200 Atakum/Samsun"
    const targetAddress = address || defaultAddress
    const encodedAddress = encodeURIComponent(targetAddress)
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
    
    window.open(googleMapsUrl, '_blank')
  }

  return (
    <Button
      onClick={handleDirections}
      className={`bg-accent hover:bg-accent/90 text-text ${className}`}
    >
      <Navigation className="w-4 h-4 mr-2" />
      Yol Tarifi Al
    </Button>
  )
}
