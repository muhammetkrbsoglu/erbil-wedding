import type { Metadata } from "next"
import { getSalons } from "@/lib/api"
import { SalonCard } from "@/components/sections/SalonCard"

export const metadata: Metadata = {
  title: "Salonlarımız | Lüks Düğün Mekanları",
  description:
    "Hayalinizdeki düğün için mükemmel salonlarımızı keşfedin. Her biri özel tasarımı ve lüks detaylarıyla unutulmaz anlar için hazırlandı.",
  keywords: ["düğün salonu", "düğün mekanı", "balo salonu", "nikah salonu", "lüks düğün"],
}

export default async function SalonlarPage() {
  const salons = await getSalons()

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/50 to-secondary/30">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-text">Salonlarımız</h1>
            <p className="text-lg md:text-xl text-neutral max-w-3xl mx-auto leading-relaxed">
              Her biri özenle tasarlanmış salonlarımızda, hayalinizdeki düğünü gerçeğe dönüştürün. Lüks detaylar ve
              mükemmel hizmet anlayışımızla unutulmaz anlar yaşayın.
            </p>
          </div>
        </div>
      </section>

      {/* Salons Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {salons.map((salon, index) => (
              <SalonCard
                key={salon.id}
                salon={salon}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-secondary/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">Hayalinizdeki Düğünü Planlayalım</h2>
            <p className="text-lg text-neutral mb-8 max-w-2xl mx-auto">
              Uzman ekibimiz, özel gününüzü mükemmel kılmak için her detayı özenle planlıyor. Hemen iletişime geçin ve
              ücretsiz keşif toplantınızı ayarlayın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent hover:bg-accent/90 text-text px-8 py-3 rounded-lg font-semibold transition-colors">
                Ücretsiz Keşif
              </button>
              <button className="border-2 border-accent text-accent hover:bg-accent hover:text-text px-8 py-3 rounded-lg font-semibold transition-colors">
                Fiyat Teklifi Al
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
