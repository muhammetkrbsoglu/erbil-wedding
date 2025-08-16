"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, MapPin, Square, LampCeilingIcon as Ceiling, Car, Play, Phone, Mail } from "lucide-react"
import { GoogleMap, DirectionsButton } from "@/components/map/GoogleMap"
import type { Salon } from "@/lib/types"

interface SalonDetailClientProps {
  salon: Salon | null
}

export default function SalonDetailClient({ salon }: SalonDetailClientProps) {
  if (!salon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral">Salon bulunamadı.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/50 to-secondary/30">
      {/* Hero Section with Video */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image src={salon.imageUrl || "/placeholder.svg"} alt={salon.name} fill className="object-cover" priority />

        {/* Video Overlay */}
        {salon.videoUrl && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-text rounded-full w-20 h-20 p-0 shadow-2xl">
              <Play className="w-8 h-8 ml-1" />
            </Button>
          </div>
        )}
        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto max-w-6xl">
              <div className="text-white space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold">{salon.name}</h1>
                <div className="flex items-center gap-4 text-lg">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    {salon.capacity} kişi kapasiteli
                  </div>
                  {salon.location && (
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      {salon.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card className="bg-secondary/20 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-text mb-4">Salon Hakkında</h2>
                  <p className="text-neutral leading-relaxed text-lg">
                    {salon.description ||
                      `${salon.name}, ${salon.capacity} kişilik kapasitesiyle düğün hayallerinizi gerçeğe dönüştürecek mükemmel bir mekan. Lüks detayları ve özel tasarımıyla unutulmaz anlar yaşamanız için hazırlandı.`}
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              {salon.features && salon.features.length > 0 && (
                <Card className="bg-secondary/20 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-text mb-6">Özellikler</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {salon.features.map((feature, index) => (
                        <Badge key={index} className="bg-secondary text-text p-3 text-sm justify-center">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Specifications */}
              {salon.specifications && (
                <Card className="bg-secondary/20 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-text mb-6">Teknik Özellikler</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex items-center space-x-3">
                        <Square className="w-6 h-6 text-accent" />
                        <div>
                          <p className="font-semibold text-text">Alan</p>
                          <p className="text-neutral">{salon.specifications.area}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Ceiling className="w-6 h-6 text-accent" />
                        <div>
                          <p className="font-semibold text-text">Tavan Yüksekliği</p>
                          <p className="text-neutral">{salon.specifications.ceiling}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Car className="w-6 h-6 text-accent" />
                        <div>
                          <p className="font-semibold text-text">Otopark</p>
                          <p className="text-neutral">{salon.specifications.parking}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="bg-secondary/20 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-text mb-6">Konum</h2>
                  <div className="rounded-xl overflow-hidden h-64 mb-4">
                    <GoogleMap
                      center={{ lat: 40.9925, lng: 29.0244 }}
                      zoom={16}
                      className="w-full h-full"
                      showBusinessInfo={true}
                      businessName={salon.name}
                      businessAddress={salon.location || "Bağdat Caddesi No: 123, Kadıköy, İstanbul 34710"}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <DirectionsButton
                      address={salon.location || "Bağdat Caddesi No: 123, Kadıköy, İstanbul 34710"}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      className="flex-1 border-accent text-accent hover:bg-accent hover:text-text bg-transparent"
                      onClick={() => window.open(`tel:+902125550123`, "_self")}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Hemen Ara
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Booking */}
            <div className="space-y-6">
              {/* Booking Card */}
              <Card className="bg-secondary/30 backdrop-blur-sm border-0 shadow-xl sticky top-8">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-text mb-6">Rezervasyon</h3>

                  {salon.price && (
                    <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                      <p className="text-sm text-neutral mb-1">Fiyat Aralığı</p>
                      <p className="text-2xl font-bold text-accent">
                        {
                          (() => {
                            const p = salon.price as number | { min?: number; max?: number } | undefined
                            if (!p) return null
                            if (typeof p === "number") {
                              return `₺${Number(p).toLocaleString()}`
                            }
                            const min = p?.min ?? p?.max
                            const max = p?.max ?? p?.min
                            if (min != null && max != null && min !== max) {
                              return `₺${Number(min).toLocaleString()} - ₺${Number(max).toLocaleString()}`
                            }
                            return `₺${Number(min ?? 0).toLocaleString()}`
                          })()
                        }
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <Button className="w-full bg-accent hover:bg-accent/90 text-text py-3 text-lg">
                      Hemen Rezervasyon Yap
                    </Button>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="border-accent text-accent hover:bg-accent hover:text-text bg-transparent"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Ara
                      </Button>
                      <Button
                        variant="outline"
                        className="border-accent text-accent hover:bg-accent hover:text-text bg-transparent"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Mail
                      </Button>
                        <Button
                          variant="outline"
                          className="border-accent text-accent hover:bg-accent hover:text-text bg-transparent"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Mail
                        </Button>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-secondary/30">
                    <p className="text-sm text-neutral text-center">Ücretsiz keşif ve danışmanlık hizmeti</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card className="bg-secondary/20 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-text mb-4">Hızlı Bilgiler</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral">Kapasite:</span>
                      <span className="text-text font-medium">{salon.capacity} kişi</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral">Rezervasyon:</span>
                      <span className="text-accent font-medium">7/24 Açık</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral">Ödeme:</span>
                      <span className="text-text font-medium">Taksitli</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
