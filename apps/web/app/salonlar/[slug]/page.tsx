import Link from "next/link";
import { notFound } from "next/navigation";
import { placeholderSalons } from "~/lib/data";

interface PageProps {
  params: { slug: string };
}

export default function SalonDetailPage({ params }: PageProps) {
  // Find the salon by slug
  const salon = placeholderSalons.find((salon) => salon.slug === params.slug);

  // If no salon is found, render 404 page
  if (!salon) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Salon Name - Using Playfair Display for headings */}
          <h1 className="text-4xl md:text-5xl font-serif text-foreground font-bold">
            {salon.name}
          </h1>

          {/* Capacity Information */}
          <p className="text-lg text-foreground/80 font-inter">
            Kapasite: {salon.capacity} kişi
          </p>

          {/* Placeholder Message */}
          <p className="text-base text-foreground/70 font-inter leading-relaxed">
            Bu salonun detaylı bilgileri ve görselleri yakında eklenecektir.
          </p>

          {/* Back to Home Link */}
          <div className="pt-8">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-accent text-white font-inter font-medium rounded-lg hover:bg-accent/90 transition-colors duration-200"
            >
              Geri Dön
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
