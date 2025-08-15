import Link from 'next/link';
import { Button } from "../../components/ui/button";

export const BrandStorySection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
            <span className="font-playfair">Hikayemiz</span>
          </h2>
          <div className="prose prose-lg mx-auto text-foreground/80">
            <p className="text-lg leading-relaxed mb-6">
              Yılların deneyimi ve tutkuyla, her çiftin özel gününü unutulmaz kılmak için buradayız. 
              Erbil Wedding olarak, sadece bir düğün organizasyonu değil, hayatınızın en özel anını 
              mükemmelleştirme sanatını sunuyoruz.
            </p>
            <p className="text-lg leading-relaxed mb-8">
              İstanbul'un en seçkin mekanlarında, profesyonel ekibimizle birlikte, 
              hayalinizdeki düğünü gerçeğe dönüştürüyoruz. Her detay, her an, sizin için özel.
            </p>
          </div>
          <Link href="/hakkimizda" legacyBehavior>
            <Button variant="outline" size="lg">
              Hikayemizi Keşfedin
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};