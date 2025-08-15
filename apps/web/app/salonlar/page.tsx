import { PrismaClient } from "@acme/db";
import { SalonCard } from "@/components/cards/SalonCard";
import type { Salon } from "@acme/types";

const prisma = new PrismaClient();

export default async function SalonsPage() {
  const salons: Salon[] = await prisma.salon.findMany();

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Tüm Salonlarımız</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {salons.map((salon) => (
          <SalonCard
            key={salon.id}
            salon={{
              ...salon,
              imageUrl: salon.imageUrl || '/images/salon-placeholder.jpg', // Add a default image
            }}
          />
        ))}
      </div>
    </main>
  );
}
