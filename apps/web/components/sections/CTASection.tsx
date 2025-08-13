export const CTASection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
            <span className="font-playfair">Hayalinizdeki Düğünü Planlayalım</span>
          </h2>
          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            Profesyonel ekibimizle birlikte, size özel düğün planınızı oluşturalım. 
            Ücretsiz danışmanlık için hemen iletişime geçin.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 hover:shadow-lg h-12 px-8 text-base font-semibold">
              Ücretsiz Randevu Al
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-accent bg-background hover:bg-accent hover:text-accent-foreground h-12 px-8 text-base">
              Salonları İncele
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-accent mb-2">500+</div>
              <div className="text-foreground/80">Mutlu Çift</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">15+</div>
              <div className="text-foreground/80">Yıl Deneyim</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">3</div>
              <div className="text-foreground/80">Prestijli Salon</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};