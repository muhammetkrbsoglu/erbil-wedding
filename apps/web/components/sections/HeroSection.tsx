import Link from "next/link"
import { Button } from "../../components/ui/button"

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-foreground mb-6">
            Hayalinizdeki Düğün Burada Gerçek Oluyor
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-12 font-inter">
            İstanbul'un en seçkin düğün salonlarında unutulmaz anılar yaratın
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/salonlar">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl px-8 py-4 text-lg"
              >
                Salonları Keşfet
              </Button>
            </Link>

            <Link href="/randevu-talep-et">
              <Button
                variant="outline"
                size="lg"
                className="border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 hover:scale-105 px-8 py-4 text-lg bg-transparent"
              >
                Hemen Teklif Al
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
