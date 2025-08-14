'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { salonSchema } from "@/lib/schemas/salon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const createSalonSchema = salonSchema.pick({
  name: true,
  capacity: true,
  description: true,
  imageUrl: true,
});

type CreateSalonSchema = z.infer<typeof createSalonSchema>;

export function CreateSalonDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<CreateSalonSchema>({
    resolver: zodResolver(createSalonSchema),
    defaultValues: {
      name: "",
      capacity: 0,
      description: "",
      imageUrl: "",
    },
  });

  async function onSubmit(data: CreateSalonSchema) {
    try {
      const response = await fetch('/api/salons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Salon oluşturulurken bir hata oluştu');
      }

      toast.success("Salon başarıyla oluşturuldu");
      window.location.reload();
    } catch (error) {
      console.error("Salon oluşturulurken hata:", error);
      toast.error("Salon oluşturulurken bir hata oluştu");
      // TODO: Add proper error handling with toast notification
    }
  }

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Yeni Salon Ekle
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-lg p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Yeni Salon Ekle</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                ×
              </Button>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Salon Adı
                </label>
                <input
                  {...form.register("name")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Salon adını girin"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Kapasite
                </label>
                <input
                  {...form.register("capacity", { valueAsNumber: true })}
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Salon kapasitesini girin"
                />
                {form.formState.errors.capacity && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.capacity.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Açıklama
                </label>
                <textarea
                  {...form.register("description")}
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Salon açıklamasını girin"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Görsel URL
                </label>
                <input
                  {...form.register("imageUrl")}
                  type="url"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Salon görseli için URL girin"
                />
                {form.formState.errors.imageUrl && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.imageUrl.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  İptal
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Ekleniyor..." : "Ekle"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
