import Link from "next/link";
import { Button } from "../../components/ui/button";
import { CheckCircle } from "lucide-react";

export default function ReservationSuccessPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          </div>

          {/* Success Message */}
          <div className="space-y-6 mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground font-bold">
              Talebiniz başarıyla alınmıştır!
            </h1>
            <p className="text-lg text-foreground/80 font-inter leading-relaxed">
              En kısa sürede sizinle iletişime geçeceğiz. Randevu talebinizi değerlendirip, 
              size özel bir teklif hazırlayacağız.
            </p>
            <p className="text-base text-foreground/70 font-inter">
              Genellikle 24 saat içinde geri dönüş yapıyoruz. Acil durumlar için 
              <span className="font-medium"> 0555 123 45 67</span> numarasından bize ulaşabilirsiniz.
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-muted/40 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-serif font-bold text-foreground mb-4">
              Sonraki Adımlar
            </h2>
            <ul className="text-left space-y-2 text-foreground/80">
              <li className="flex items-start">
                <span className="text-accent font-bold mr-2">1.</span>
                Talebinizi inceleyeceğiz
              </li>
              <li className="flex items-start">
                <span className="text-accent font-bold mr-2">2.</span>
                Size özel bir teklif hazırlayacağız
              </li>
              <li className="flex items-start">
                <span className="text-accent font-bold mr-2">3.</span>
                E-posta veya telefon ile sizinle iletişime geçeceğiz
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-text">
              <Link href="/">
                Ana Sayfaya Dön
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/salonlar">
                Diğer Salonları İncele
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
