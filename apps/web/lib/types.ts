export interface Salon {
  id: string
  name: string
  slug: string
  imageUrl: string
  capacity: number
  description?: string
  features?: string[]
  videoUrl?: string
  gallery?: string[]
  location?: string
  price?: {
    min: number
    max: number
  }
  amenities?: string[]
  specifications?: {
    area: string
    ceiling: string
    parking: string
  }
}

export interface BookingRequest {
  id?: string
  venueId: string
  contactInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  eventDetails: {
    eventDate: string
    guestCount: number
    eventType: string
    duration: string
  }
  specialRequirements?: string
  status?: "pending" | "confirmed" | "cancelled"
  createdAt?: string
}

export interface BookingFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  eventDate: string
  guestCount: number
  eventType: string
  duration: string
  specialRequirements: string
}

export const EVENT_TYPES = ["Düğün", "Nişan", "Doğum Günü", "Kurumsal Etkinlik", "Mezuniyet", "Diğer"] as const

export const DURATION_OPTIONS = ["4-6 saat", "6-8 saat", "8-10 saat", "Tam gün", "Çok günlü"] as const
