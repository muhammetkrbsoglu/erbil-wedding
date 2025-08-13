import { SalonCard } from "../cards/SalonCard";

export const SalonShowcaseSection = () => {
  const salons = [
    {
      imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2098&q=80",
      name: "Gül Bahçesi Balo Salonu",
      capacity: 300,
      slug: "gul-bahcesi-balo-salonu"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      name: "Kristal Teras",
      capacity: 150,
      slug: "kristal-teras"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      name: "Bahçe Terası",
      capacity: 200,
      slug: "bahce-terasi"
    }
  ];

  return (
    <section className="py-20 md:py-24">
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
            <SalonCard
              key={salon.slug}
              imageUrl={salon.imageUrl}
              name={salon.name}
              capacity={salon.capacity}
              slug={salon.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};