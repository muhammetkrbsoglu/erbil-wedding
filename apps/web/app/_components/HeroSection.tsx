import { Button } from "../../components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        // poster="/hero-video-poster.jpg" // Add a high-quality poster image here
      >
        <source
          src="https://videos.pexels.com/video-files/856945/856945-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
        {/* Fallback for browsers that don't support video */}
        <div className="absolute inset-0 bg-gradient-to-br from-background to-secondary/20" />
      </video>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center text-white">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
          <span className="font-playfair">Hayallerinizdeki Düğün Başlıyor</span>
        </h1>
        
        {/* Subheading */}
        <p className="text-lg md:text-xl lg:text-2xl font-inter mb-8 max-w-3xl mx-auto leading-relaxed">
          Eşsiz anlar için tasarlanmış, büyüleyici mekanlar.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary Button - Emerald Green */}
          <Button 
            variant="default" 
            size="lg"
            className="text-base font-medium px-8 py-4 h-auto"
          >
            Salonları Keşfet
          </Button>
          
          {/* Secondary Button - Champagne Gold Outline */}
          <Button 
            variant="outline" 
            size="lg"
            className="text-base font-medium px-8 py-4 h-auto border-primary text-white hover:bg-primary hover:text-foreground"
          >
            Hemen Teklif Al
          </Button>
        </div>
      </div>

      {/* Subtle gradient overlay at bottom for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/20 to-transparent z-10" />
    </section>
  );
};