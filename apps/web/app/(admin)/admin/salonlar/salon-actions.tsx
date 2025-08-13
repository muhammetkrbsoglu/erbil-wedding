"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { Salon } from "@acme/types";
import { updateSalon, deleteSalon } from "../../../../lib/actions";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";

interface SalonActionsProps {
  salon: Salon;
}

export function SalonActions({ salon }: SalonActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: salon.name,
    capacity: salon.capacity.toString(),
    imageUrl: salon.imageUrl,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async (formData: FormData) => {
    try {
      await updateSalon(formData);
      setIsEditOpen(false);
      // Reset form data to current salon data
      setFormData({
        name: salon.name,
        capacity: salon.capacity.toString(),
        imageUrl: salon.imageUrl,
      });
    } catch (error) {
      console.error("Error updating salon:", error);
    }
  };

  const handleDelete = async (formData: FormData) => {
    try {
      await deleteSalon(formData);
    } catch (error) {
      console.error("Error deleting salon:", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Edit Button & Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Salon Düzenle</DialogTitle>
            <DialogDescription>
              Salon bilgilerini güncelleyin. Değişiklikleri kaydetmek için "Kaydet" butonuna tıklayın.
            </DialogDescription>
          </DialogHeader>
          <form action={handleUpdate} className="space-y-4">
            <input type="hidden" name="id" value={salon.id} />
            
            <div className="space-y-2">
              <Label htmlFor="name">Salon Adı</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacity">Kapasite</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => handleInputChange("capacity", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Resim URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                required
              />
            </div>
            
            <DialogFooter>
              <Button type="submit">Kaydet</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Button & Alert Dialog */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Salon Sil</AlertDialogTitle>
            <AlertDialogDescription>
              Bu salonu kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <form action={handleDelete}>
              <input type="hidden" name="id" value={salon.id} />
              <AlertDialogAction type="submit" className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Sil
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
