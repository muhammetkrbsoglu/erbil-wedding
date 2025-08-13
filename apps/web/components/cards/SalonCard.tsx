import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import { Button } from "../ui/button";

interface SalonCardProps {
  imageUrl: string;
  name: string;
  capacity: number;
  slug: string;
}

export const SalonCard = ({ imageUrl, name, capacity, slug }: SalonCardProps) => {
  return (
    <Link href={`/salonlar/${slug}`} className="block group">
      <div className="border border-border rounded-lg bg-card transition-all duration-300 hover:shadow-xl overflow-hidden">
        {/* Image Area */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={imageUrl}
            alt={`${name} - Elegant wedding venue interior`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-4">
          {/* Salon Name */}
          <h3 className="text-xl font-playfair font-bold text-foreground leading-tight">
            {name}
          </h3>

          {/* Capacity Info */}
          <div className="flex items-center gap-2 text-foreground/70">
            <Users size={18} className="text-accent" />
            <span className="text-sm font-inter">
              Maks. {capacity} Kişi
            </span>
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <Button 
              variant="outline" 
              size="default"
              className="w-full font-inter font-medium"
            >
              Detayları İncele
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
