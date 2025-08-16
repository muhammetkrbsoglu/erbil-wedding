"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getSalons, submitBookingRequest } from "../../lib/api"
import type { Salon, BookingFormData } from "../../lib/types"
import { SalonCard } from "../../components/booking/SalonCard"
import { VenueDetails } from "../../components/booking/VenueDetails"
import { BookingForm } from "../../components/booking/BookingForm"
import { Button } from "../../components/ui/button"
import { ArrowLeft, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

export default function BookingPage() {
  const [venues, setVenues] = useState<Salon[]>([])
  const [selectedVenue, setSelectedVenue] = useState<Salon | null>(null)
  const [activeTab, setActiveTab] = useState<"details" | "booking">("details")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const loadVenues = async () => {
      try {
        const venueData = await getSalons()
        setVenues(venueData)
      } catch (error) {
        console.error("Failed to load venues:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadVenues()
  }, [])

  const handleVenueSelect = (venue: Salon) => {
    setSelectedVenue(venue)
    setActiveTab("details")
  }

  const handleBookingSubmit = async (formData: BookingFormData) => {
    if (!selectedVenue) return

    setIsSubmitting(true)
    try {
      await submitBookingRequest({
        ...formData,
        venueId: selectedVenue.id,
      })
    } catch (error) {
      console.error("Booking submission failed:", error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div className="text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <motion.div
            className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <p className="text-neutral">Salonlar yükleniyor...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        className="bg-primary/5 border-b border-secondary/20 sticky top-0 z-10 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Ana Sayfa
                </Button>
              </Link>
              <div className="hidden md:block">
                <h1 className="text-2xl font-bold text-text">Randevu Talep Et</h1>
                <p className="text-sm text-neutral">Hayalinizdeki etkinlik için salon seçin ve randevu alın</p>
              </div>
            </div>
            {selectedVenue && (
              <motion.div
                className="hidden lg:flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Calendar className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-text">{selectedVenue.name}</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-200px)]">
          {/* Left Panel - Venue Selection */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-semibold text-text">Salon Seçimi</h2>
              <span className="text-sm text-neutral">({venues.length} salon)</span>
            </div>

            <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 custom-scrollbar">
              {venues.map((venue, index) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => handleVenueSelect(venue)}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedVenue?.id === venue.id ? "ring-2 ring-accent ring-offset-2 ring-offset-background" : ""
                  }`}
                >
                  <SalonCard salon={venue} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Panel - Venue Details & Booking Form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-secondary/10 rounded-2xl p-6 h-full">
              {selectedVenue ? (
                <div className="space-y-6 h-full">
                  {/* Tab Navigation */}
                  <div className="flex bg-primary/10 rounded-lg p-1">
                    <button
                      onClick={() => setActiveTab("details")}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                        activeTab === "details" ? "bg-accent text-text shadow-sm" : "text-neutral hover:text-text"
                      }`}
                    >
                      Salon Detayları
                    </button>
                    <button
                      onClick={() => setActiveTab("booking")}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                        activeTab === "booking" ? "bg-accent text-text shadow-sm" : "text-neutral hover:text-text"
                      }`}
                    >
                      Randevu Formu
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="flex-1 overflow-hidden">
                    <AnimatePresence mode="wait">
                      {activeTab === "details" ? (
                        <motion.div
                          key="details"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="h-full"
                        >
                          <VenueDetails venue={selectedVenue} />
                          <div className="mt-6 pt-4 border-t border-secondary/20">
                            <Button
                              onClick={() => setActiveTab("booking")}
                              className="w-full bg-accent hover:bg-accent/90 text-text"
                              size="lg"
                            >
                              Randevu Talep Et
                            </Button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="booking"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="h-full"
                        >
                          <BookingForm
                            venueId={selectedVenue.id}
                            onSubmit={handleBookingSubmit}
                            isLoading={isSubmitting}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <motion.div
                  className="flex items-center justify-center h-full text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div>
                    <motion.div
                      className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <Calendar className="w-12 h-12 text-accent" />
                    </motion.div>
                    <motion.h3
                      className="text-2xl font-semibold text-text mb-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Salon Seçin
                    </motion.h3>
                    <motion.p
                      className="text-neutral max-w-md"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Randevu talebinde bulunmak için sol panelden bir salon seçin. Salon detaylarını inceleyip randevu
                      formunu doldurabilirsiniz.
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
