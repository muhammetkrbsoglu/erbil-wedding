import type { Salon } from "@/lib/types"

export async function getSalons(): Promise<Salon[]> {
  // API hazır olana kadar statik veri döndürüyoruz
  return [
    {
      id: "1",
      imageUrl:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2098&q=80",
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
      price: { min: 50000, max: 80000 },
      specifications: {
        area: "400 m²",
        ceiling: "4.5 m",
        parking: "100 araç",
      },
    },
    {
      id: "2",
      imageUrl:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      name: "Kristal Teras",
      capacity: 150,
      slug: "kristal-teras",
      description:
        "Cam tavanı ve doğal ışığıyla büyüleyici bir atmosfer sunan Kristal Teras, özel günleriniz için romantik bir ortam yaratır.",
      features: ["Cam Tavan", "Doğal Işık", "Bahçe Manzarası", "İntim Atmosfer", "Modern Tasarım"],
      videoUrl: "https://example.com/video2.mp4",
      location: "Beşiktaş, İstanbul",
      price: { min: 30000, max: 50000 },
      specifications: {
        area: "250 m²",
        ceiling: "3.8 m",
        parking: "60 araç",
      },
    },
    {
      id: "3",
      imageUrl:
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      name: "Bahçe Terası",
      capacity: 200,
      slug: "bahce-terasi",
      description:
        "Açık hava düğünleri için ideal olan Bahçe Terası, doğayla iç içe unutulmaz anlar yaşamanızı sağlar.",
      features: ["Açık Hava", "Bahçe Ortamı", "Yıldızlı Tavan", "Doğal Dekor", "Romantik Aydınlatma"],
      videoUrl: "https://example.com/video3.mp4",
      location: "Sarıyer, İstanbul",
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
