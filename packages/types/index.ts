export type Salon = {
  id: string;
  name: string;
  slug: string;
  capacity: number;
  imageUrl: string;
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