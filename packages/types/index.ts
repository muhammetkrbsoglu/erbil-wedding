export type Salon = {
  id: string;
  name: string;
  slug: string;
  capacity: number;
  // optional to match frontend usage where images may be missing
  imageUrl?: string;
  // array of image URLs used by UI components
  images?: string[];
  // price can be a single number or a range
  price?: number | { min: number; max: number };
  createdAt?: string;
  updatedAt?: string;
};

export type Reservation = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventDateRange: string;
  eventType: string;
  notes?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  salonId: string;
  salon?: Salon;
};