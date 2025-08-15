import type { Salon } from "./types"

export async function getSalons(): Promise<Salon[]> {
  // API hazır olana kadar statik veri döndürüyoruz
  return [
    {
      id: "1",
      imageUrl: "/placeholder.svg?height=400&width=600",
      name: "Gül Bahçesi Balo Salonu",
      capacity: 300,
      slug: "gul-bahcesi-balo-salonu",
      description:
        "Zarif tasarımı ve geniş alanıyla hayalinizdeki düğün için mükemmel bir seçim. Kristal avizeler ve altın detaylarla süslenmiş bu salon, 300 kişiye kadar konuk ağırlayabilir.",
      features: [
        "Kristal Avizeler",
        "Altın Detaylar",
        "Geniş Dans Pisti",
        "VIP Gelin Odası",
        "Profesyonel Ses Sistemi",
      ],
      videoUrl: "https://example.com/video1.mp4",
      location: "Merkez, İstanbul",
      rating: 4.9,
      hasVideo: true,
      price: { min: 50000, max: 80000 },
      specifications: {
        area: "400 m²",
        ceiling: "4.5 m",
        parking: "100 araç",
      },
    },
    {
      id: "2",
      imageUrl: "/placeholder.svg?height=400&width=600",
      name: "Kristal Teras",
      capacity: 150,
      slug: "kristal-teras",
      description:
        "Cam tavanı ve doğal ışığıyla büyüleyici bir atmosfer sunan Kristal Teras, özel günleriniz için romantik bir ortam yaratır.",
      features: ["Cam Tavan", "Doğal Işık", "Bahçe Manzarası", "İntim Atmosfer", "Modern Tasarım"],
      videoUrl: "https://example.com/video2.mp4",
      location: "Beşiktaş, İstanbul",
      rating: 4.8,
      hasVideo: true,
      price: { min: 30000, max: 50000 },
      specifications: {
        area: "250 m²",
        ceiling: "3.8 m",
        parking: "60 araç",
      },
    },
    {
      id: "3",
      imageUrl: "/placeholder.svg?height=400&width=600",
      name: "Bahçe Terası",
      capacity: 200,
      slug: "bahce-terasi",
      description:
        "Açık hava düğünleri için ideal olan Bahçe Terası, doğayla iç içe unutulmaz anlar yaşamanızı sağlar.",
      features: ["Açık Hava", "Bahçe Ortamı", "Yıldızlı Tavan", "Doğal Dekor", "Romantik Aydınlatma"],
      videoUrl: "https://example.com/video3.mp4",
      location: "Sarıyer, İstanbul",
      rating: 4.7,
      hasVideo: true,
      price: { min: 35000, max: 60000 },
      specifications: {
        area: "300 m²",
        ceiling: "Açık tavan",
        parking: "80 araç",
      },
    },
  ]
}

export async function getSalonBySlug(slug: string): Promise<Salon | null> {
  const salons = await getSalons()
  return salons.find((s) => s.slug === slug) || null
}
