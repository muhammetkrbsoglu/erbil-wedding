'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DeleteSalonDialogProps {
  salonId: string;
  salonName: string;
}

export function DeleteSalonDialog({ salonId, salonName }: DeleteSalonDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/salons/${salonId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Salon silinirken bir hata oluştu');
      }

      toast.success("Salon başarıyla silindi");
      window.location.reload();
    } catch (error) {
      console.error("Salon silinirken hata:", error);
      toast.error("Salon silinirken bir hata oluştu")
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setIsOpen(true)}
      >
        Sil
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
            <h2 className="text-lg font-semibold">Salonu Sil</h2>
            <p className="text-muted-foreground">
              <strong>{salonName}</strong> salonunu silmek istediğinizden emin misiniz?
              Bu işlem geri alınamaz.
            </p>
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                İptal
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Siliniyor..." : "Sil"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
