export const SalonShowcaseSection = () => {
  const salons = [
    {
      id: 1,
      name: "Grand Palace",
      description: "Klasik zarafet ve modern konforun buluştuğu prestijli salon",
      capacity: "200-400 kişi",
      features: ["Geniş dans pisti", "Profesyonel ses sistemi", "Özel gelin odası"]
    },
    {
      id: 2,
      name: "Crystal Ballroom",
      description: "Kristal avizeler ve zarif dekorasyonla büyüleyici atmosfer",
      capacity: "150-300 kişi", 
      features: ["Kristal dekorasyon", "Panoramik manzara", "Premium catering"]
    },
    {
      id: 3,
      name: "Garden Terrace",
      description: "Doğayla iç içe, açık hava düğünleri için ideal mekan",
      capacity: "100-250 kişi",
      features: ["Bahçe manzarası", "Açık hava", "Romantik aydınlatma"]
    }
  ];

  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            <span className="font-playfair">Salonlarımız</span>
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Her biri kendine özgü karakteri ve atmosferi ile sizin özel gününüzü mükemmelleştirmek için tasarlanmış salonlarımızı keşfedin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {salons.map((salon) => (
            <div key={salon.id} className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Placeholder for salon image */}
              <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-foreground/60 text-lg font-medium">{salon.name}</span>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                  <span className="font-playfair">{salon.name}</span>
                </h3>
                <p className="text-foreground/80 mb-4">{salon.description}</p>
                
                <div className="mb-4">
                  <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                    {salon.capacity}
                  </span>
                </div>
                
                <ul className="space-y-1 mb-6">
                  {salon.features.map((feature, index) => (
                    <li key={index} className="text-sm text-foreground/70 flex items-center">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-primary bg-background hover:bg-primary hover:text-primary-foreground h-10 px-4 py-2">
                  Detayları Görüntüle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};