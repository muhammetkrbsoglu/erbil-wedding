export interface Salon {
  id: string
  name: string
  slug: string
  imageUrl: string
  capacity: number
  description?: string
  features?: string[]
  price?: number
  location?: string
}
