import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Users, Car, Wifi, Utensils } from "lucide-react";
import { getSalonBySlug } from "@/src/lib/api";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// High-quality venue placeholder images from Unsplash
const salonImages = [
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2098&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
];

export default async function SalonDetailPage({ params }: PageProps) {
  // Await the params in Next.js 15
  const { slug } = await params;
  
  // Find the salon by slug
  const salon = await getSalonBySlug(slug);

  // If no salon is found, render 404 page
  if (!salon) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Image Gallery Hero Section */}
      <section className="relative h-[70vh] w-full">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {salonImages.map((imageUrl, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-[70vh]">
                  <Image
                    src={imageUrl}
                    alt={`${salon.name} - Görsel ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-6" />
          <CarouselNext className="right-6" />
        </Carousel>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content (2 columns span) */}
            <div className="lg:col-span-2 space-y-12">
              {/* Salon Name */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground font-bold leading-tight">
                  {salon.name}
                </h1>
              </div>

              {/* Description */}
              <div className="space-y-6">
                <p className="text-lg text-foreground/80 font-inter leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <p className="text-lg text-foreground/80 font-inter leading-relaxed">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.
                </p>
                <p className="text-lg text-foreground/80 font-inter leading-relaxed">
                  Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.
                </p>
              </div>

              {/* Features Section */}
              <div className="space-y-8">
                <h2 className="text-2xl md:text-3xl font-serif text-foreground font-bold">
                  Öne Çıkan Özellikler
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold text-foreground">
                        {salon.capacity} Kişi Kapasite
                      </h3>
                      <p className="text-sm text-foreground/70 font-inter">
                        Geniş ve konforlu alan
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Car className="w-6 h-6 text-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold text-foreground">
                        Otopark Mevcut
                      </h3>
                      <p className="text-sm text-foreground/70 font-inter">
                        Ücretsiz vale hizmeti
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Wifi className="w-6 h-6 text-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold text-foreground">
                        Yüksek Hızlı İnternet
                      </h3>
                      <p className="text-sm text-foreground/70 font-inter">
                        Fiber internet bağlantısı
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Utensils className="w-6 h-6 text-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-inter font-semibold text-foreground">
                        Catering Hizmeti
                      </h3>
                      <p className="text-sm text-foreground/70 font-inter">
                        Profesyonel mutfak ekibi
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-8">
                <div className="bg-secondary rounded-lg p-8 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-serif font-bold text-foreground">
                      Bu Salonda Yerinizi Alın
                    </h3>
                    <p className="text-foreground/80 font-inter leading-relaxed">
                      Hayalinizdeki düğün için hemen bizimle iletişime geçin. Size özel teklifimizi hazırlayalım.
                    </p>
                  </div>
                  
                  <Link href={`/salonlar/${slug}/randevu-al`}>
                    <Button 
                      size="lg" 
                      className="w-full bg-accent hover:bg-accent/90 text-white font-inter font-medium text-lg py-4"
                    >
                      Randevu Talebi Oluştur
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
