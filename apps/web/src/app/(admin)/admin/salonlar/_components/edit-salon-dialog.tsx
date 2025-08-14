'use client';

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { salonSchema } from "../../../lib/schemas/salon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Salon } from "../../../lib/schemas/salon";

const editSalonSchema = salonSchema.pick({
  name: true,
  capacity: true,
  description: true,
  imageUrl: true,
});

type EditSalonSchema = z.infer<typeof editSalonSchema>;

interface EditSalonDialogProps {
  salon: Salon;
}

export function EditSalonDialog({ salon }: EditSalonDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EditSalonSchema>({
    resolver: zodResolver(editSalonSchema),
    defaultValues: {
      name: salon.name,
      capacity: salon.capacity,
      description: salon.description || "",
      imageUrl: salon.imageUrl || "",
    },
  });

  async function onSubmit(data: EditSalonSchema) {
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/salons/${salon.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Salon güncellenirken bir hata oluştu');
      }

      toast.success("Salon başarıyla güncellendi");
      window.location.reload();
    } catch (error) {
      console.error("Salon güncellenirken hata:", error);
      toast.error("Salon güncellenirken bir hata oluştu")
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
      >
        Düzenle
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-lg p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Salon Düzenle</h2>
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
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Güncelleniyor..." : "Güncelle"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
