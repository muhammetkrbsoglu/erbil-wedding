import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

export const BrandStorySection = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
          {/* Left Column - Image */}
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Elegant wedding detail showcasing luxury and sophistication"
              width={600}
              height={700}
              className="rounded-lg object-cover w-full h-[500px] md:h-[600px]"
              priority={false}
            />
          </div>

          {/* Right Column - Content */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Eyebrow Text */}
            <div className="text-accent font-inter font-medium text-sm tracking-widest uppercase">
              ERBİL WEDDING HİKAYESİ
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground leading-tight">
              Zarafetin ve Unutulmaz Anıların Buluştuğu Yer
            </h2>

            {/* Body Text */}
            <div className="space-y-6">
              <p className="text-lg font-inter text-foreground/80 leading-relaxed">
                Yılların deneyimi ve tutkuyla, her çiftin özel gününü unutulmaz kılmak için buradayız. Erbil Wedding
                olarak, sadece bir düğün organizasyonu değil, hayatınızın en özel anını mükemmelleştirme sanatını
                sunuyoruz.
              </p>

              <p className="text-lg font-inter text-foreground/80 leading-relaxed">
                İstanbul'un en seçkin mekanlarında, profesyonel ekibimizle birlikte, hayalinizdeki düğünü gerçeğe
                dönüştürüyoruz. Her detay, her an, sizin için özel. Zarafetin ve mükemmeliyetin buluştuğu noktada, size
                unutulmaz bir deneyim sunmak için varız.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link href="/hikayemiz">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-inter font-medium bg-transparent hover:bg-accent hover:text-text transition-all duration-300 hover:scale-105"
                >
                  Hikayemizi Keşfedin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
