"use client";

import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../../../components/ui/dialog";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { createSalon } from "../../../../lib/actions";

export function AddSalonForm() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    
    try {
      await createSalon(formData);
      setOpen(false);
      // Reset form by closing and reopening
    } catch (error) {
      console.error("Error creating salon:", error);
      alert("Salon oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Yeni Salon Ekle</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-playfair">Yeni Salon Ekle</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Salon Adı</Label>
            <Input
              id="name"
              name="name"
              placeholder="Örn: Gül Bahçesi Balo Salonu"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="capacity">Kapasite</Label>
            <Input
              id="capacity"
              name="capacity"
              type="number"
              placeholder="Örn: 300"
              min="1"
              required
              disabled={isSubmitting}
            />
          </div>
          
                      <div className="space-y-2">
              <Label htmlFor="imageUrl">Görsel URL'si</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                required
                disabled={isSubmitting}
              />
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Önerilen: Unsplash, Pexels veya Picsum Photos'dan görsel URL'si</p>
                <p>Örnek: https://images.unsplash.com/photo-1519167758481-83f550bb49b3</p>
              </div>
            </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              İptal
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
