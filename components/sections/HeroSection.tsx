import Link from 'next/link';
import { Button } from "../../components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
          <span className="font-playfair">Hayalinizdeki Düğün</span>
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
          İstanbul'un en prestijli salonlarında unutulmaz anlar yaşayın. 
          Her detayı özenle planlanmış, mükemmel düğün deneyimi için biz buradayız.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/#salonlar" scroll={false} legacyBehavior>
            <Button variant="default" size="lg">
              Salonları Keşfedin
            </Button>
          </Link>
          <Link href="/salonlar/gul-bahcesi-balo-salonu/randevu-al" legacyBehavior>
            <Button variant="outline" size="lg">
              Randevu Talep Et
            </Button>
          </Link>
        </div>
      </div>
      {/* Placeholder for future video background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-secondary/10 to-primary/10" />
    </section>
  );
};