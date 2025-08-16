"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Navigation, Phone, Clock } from "lucide-react"

export function GoogleMap() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Card className="border-2 overflow-hidden" style={{ borderColor: "#D5B4A1", backgroundColor: "#FEFCFA" }}>
      <div className="relative h-96 bg-gradient-to-br from-[#F5EBE0] to-[#D5B4A1] flex items-center justify-center">
        {/* Mock Map Interface */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100" />
          <div className="absolute top-4 left-4 w-8 h-8 bg-red-500 rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <MapPin className="w-12 h-12" style={{ color: "#C88A55" }} />
          </div>
        </div>

        <div className="relative z-10 text-center p-6">
          <MapPin className="w-16 h-16 mx-auto mb-4" style={{ color: "#C88A55" }} />
          <h3 className="font-playfair text-2xl font-bold mb-2" style={{ color: "#312B27" }}>
            Erbil Wedding
          </h3>
          <p className="mb-4" style={{ color: "#8B7355" }}>
            Yeşildere, Atakum/Samsun
          </p>
          <Button
            className="mb-4"
            style={{ backgroundColor: "#C88A55", color: "#312B27" }}
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
            <MapPin className="w-5 h-5" style={{ color: "#C88A55" }} />
            <div>
              <p className="font-semibold" style={{ color: "#312B27" }}>
                Adres
              </p>
              <p className="text-sm" style={{ color: "#8B7355" }}>
                Yeşildere, 550. Sk. No:8, 55200 Atakum/Samsun
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5" style={{ color: "#C88A55" }} />
            <div>
              <p className="font-semibold" style={{ color: "#312B27" }}>
                Telefon
              </p>
              <p className="text-sm" style={{ color: "#8B7355" }}>
                +90 (312) 555 0123
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t" style={{ borderColor: "#D5B4A1" }}>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5" style={{ color: "#C88A55" }} />
            <div>
              <p className="font-semibold" style={{ color: "#312B27" }}>
                Çalışma Saatleri
              </p>
              <p className="text-sm" style={{ color: "#8B7355" }}>
                Pazartesi-Cuma: 09:00-18:00
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
