"use client";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { getSalonBySlug } from "../../../../lib/api";
import { createReservation } from "../../../../lib/actions";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../../../../components/ui/select";
import { Textarea } from "../../../../components/ui/textarea";
import type { Salon } from "@acme/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button 
      type="submit"
      size="lg" 
      className="w-full bg-accent hover:bg-accent/90 text-white font-inter font-medium text-lg py-4"
      disabled={pending}
    >
      {pending ? "Gönderiliyor..." : "Talebi Gönder"}
    </Button>
  );
}

export default function RequestQuotePage({ params }: PageProps) {
  const [salon, setSalon] = useState<Salon | null>(null);
  const [loading, setLoading] = useState(true);
  const [eventType, setEventType] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    async function fetchSalon() {
      try {
        const { slug } = await params;
        const salonData = await getSalonBySlug(slug);
        setSalon(salonData);
      } catch (error) {
        console.error("Error fetching salon:", error);
        setSalon(null);
      } finally {
        setLoading(false);
      }
    }

    fetchSalon();
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-foreground/60">Salon bilgileri yükleniyor...</p>
        </div>
      </main>
    );
  }

  // If no salon is found, render 404 page
  if (!salon) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Main Container */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground font-bold mb-6">
              {salon.name} için Randevu Talebi
            </h1>
            <p className="text-lg text-foreground/80 font-inter leading-relaxed max-w-2xl mx-auto">
              Hayalinizdeki etkinlik için size özel bir teklif hazırlayalım. Aşağıdaki formu doldurarak 
              bizimle iletişime geçin, en kısa sürede size dönüş yapalım.
            </p>
          </div>

          {/* Form Section */}
          <div className="max-w-2xl mx-auto">
            <form action={createReservation} className="space-y-8">
              {/* Hidden field for salon ID */}
              <input type="hidden" name="salonId" value={salon.id} />
              
              {/* Step 1: Etkinlik Detayları */}
              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-4">
                  Etkinlik Detayları
                </h2>
                
                {/* Etkinlik Türü */}
                <div className="space-y-2">
                  <Label htmlFor="event-type" className="font-inter font-medium text-foreground">
                    Etkinlik Türü *
                  </Label>
                  <Select name="eventType" value={eventType} onValueChange={setEventType} required>
                    <SelectTrigger id="event-type">
                      <SelectValue placeholder="Etkinlik türünüzü seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Düğün">Düğün</SelectItem>
                      <SelectItem value="Nişan">Nişan</SelectItem>
                      <SelectItem value="Kına">Kına</SelectItem>
                      <SelectItem value="Sohbet">Sohbet</SelectItem>
                      <SelectItem value="Doğum Günü">Doğum Günü</SelectItem>
                      <SelectItem value="Kurumsal Etkinlik">Kurumsal Etkinlik</SelectItem>
                      <SelectItem value="Diğer">Diğer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* İstenilen Dönem */}
                <div className="space-y-2">
                  <Label className="font-inter font-medium text-foreground">
                    İstenilen Dönem *
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Ay Seçimi */}
                    <div className="space-y-2">
                      <Label htmlFor="month" className="font-inter text-sm text-foreground/80">
                        Ay
                      </Label>
                      <Select name="month" value={month} onValueChange={setMonth} required>
                        <SelectTrigger id="month">
                          <SelectValue placeholder="Ay seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="01">Ocak</SelectItem>
                          <SelectItem value="02">Şubat</SelectItem>
                          <SelectItem value="03">Mart</SelectItem>
                          <SelectItem value="04">Nisan</SelectItem>
                          <SelectItem value="05">Mayıs</SelectItem>
                          <SelectItem value="06">Haziran</SelectItem>
                          <SelectItem value="07">Temmuz</SelectItem>
                          <SelectItem value="08">Ağustos</SelectItem>
                          <SelectItem value="09">Eylül</SelectItem>
                          <SelectItem value="10">Ekim</SelectItem>
                          <SelectItem value="11">Kasım</SelectItem>
                          <SelectItem value="12">Aralık</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Yıl Seçimi */}
                    <div className="space-y-2">
                      <Label htmlFor="year" className="font-inter text-sm text-foreground/80">
                        Yıl
                      </Label>
                      <Select name="year" value={year} onValueChange={setYear} required>
                        <SelectTrigger id="year">
                          <SelectValue placeholder="Yıl seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2026">2026</SelectItem>
                          <SelectItem value="2027">2027</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: İletişim Bilgileri */}
              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-4">
                  İletişim Bilgileriniz
                </h2>

                {/* Ad Soyad */}
                <div className="space-y-2">
                  <Label htmlFor="full-name" className="font-inter font-medium text-foreground">
                    Ad Soyad *
                  </Label>
                  <Input 
                    id="full-name"
                    name="customerName"
                    type="text" 
                    placeholder="Adınız ve soyadınız"
                    required
                  />
                </div>

                {/* E-posta */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-inter font-medium text-foreground">
                    E-posta Adresiniz *
                  </Label>
                  <Input 
                    id="email"
                    name="customerEmail"
                    type="email" 
                    placeholder="ornek@email.com"
                    required
                  />
                </div>

                {/* Telefon */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-inter font-medium text-foreground">
                    Telefon Numaranız *
                  </Label>
                  <Input 
                    id="phone"
                    name="customerPhone"
                    type="tel" 
                    placeholder="0555 123 45 67"
                    required
                  />
                </div>

                {/* Ek Notlar */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="font-inter font-medium text-foreground">
                    Ek Notlarınız
                  </Label>
                  <Textarea 
                    id="notes"
                    name="notes"
                    placeholder="Etkinliğiniz hakkında eklemek istediğiniz detaylar, özel istekleriniz..."
                    rows={4}
                  />
                  <p className="text-sm text-foreground/60 font-inter">
                    Salon kapasitesi: {salon.capacity} kişi
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <SubmitButton />
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}