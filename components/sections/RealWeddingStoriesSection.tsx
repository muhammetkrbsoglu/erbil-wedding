export const RealWeddingStoriesSection = () => {
  const testimonials = [
    {
      id: 1,
      couple: "Ayşe & Mehmet",
      quote: "Hayalimizden de güzel bir düğün geçirdik. Erbil Wedding ekibi her detayı mükemmel şekilde organize etti.",
      venue: "Grand Palace",
      date: "Eylül 2024"
    },
    {
      id: 2,
      couple: "Zeynep & Can",
      quote: "Profesyonel yaklaşımları ve samimi ilgileri sayesinde stressiz bir düğün süreci yaşadık. Herkese tavsiye ederiz.",
      venue: "Crystal Ballroom", 
      date: "Ağustos 2024"
    },
    {
      id: 3,
      couple: "Elif & Emre",
      quote: "Bahçe terasında gerçekleştirdiğimiz düğünümüz tam istediğimiz gibiydi. Romantik ve unutulmaz bir gece oldu.",
      venue: "Garden Terrace",
      date: "Haziran 2024"
    }
  ];

  const getInitials = (coupleNames: string) => {
    const names = coupleNames.split(' & ');
    const firstName = names[0]?.charAt(0) || '';
    const secondName = names[1]?.charAt(0) || '';
    return firstName + secondName;
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            <span className="font-playfair">Mutlu Çiftlerimizden</span>
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Bizimle hayallerindeki düğünü gerçekleştiren çiftlerimizin deneyimlerini keşfedin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-card rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border/50">
              {/* Placeholder for couple photo */}
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-serif font-bold text-foreground/60">
                  {getInitials(testimonial.couple)}
                </span>
              </div>
              
              <blockquote className="text-center mb-6">
                <p className="text-foreground/80 italic leading-relaxed mb-4">
                  "{testimonial.quote}"
                </p>
                <footer>
                  <cite className="text-foreground font-semibold not-italic">
                    {testimonial.couple}
                  </cite>
                  <div className="text-sm text-foreground/60 mt-1">
                    {testimonial.venue} • {testimonial.date}
                  </div>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-primary bg-background hover:bg-primary hover:text-primary-foreground h-11 px-8">
            Daha Fazla Hikaye
          </button>
        </div>
      </div>
    </section>
  );
};