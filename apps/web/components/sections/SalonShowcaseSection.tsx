import { SalonCard } from "../cards/SalonCard";
import { getSalons } from "../../lib/api";

export const SalonShowcaseSection = async () => {
  const salons = await getSalons();

  return (
    <section id="salonlar" className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-6">
            Hayallerinize Ev Sahipliği Yapacak Salonlarımız
          </h2>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {salons.map((salon) => (
            <SalonCard key={salon.id} salon={salon} />
          ))}
        </div>
      </div>
    </section>
  );
};