import { Button } from "../ui/button";

export const CTASection = () => {
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            <span className="font-playfair">Hayalinizdeki Düğünü Planlamaya Başlayın</span>
          </h2>
          <p className="text-lg text-foreground/80 mb-8 font-inter">
            Profesyonel ekibimizle tanışmak, salonlarımızı yakından görmek ve size özel tekliflerimizi
            öğrenmek için ilk adımı atın.
          </p>

          <Button size="lg" className="">
            Hemen Randevu Talep Edin
          </Button>
        </div>
      </div>
    </section>
  );
};