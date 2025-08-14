"use client";

import { useState } from "react";
import { Pencil, Trash2, Upload } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
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

// Import ImageKit for client-side uploads
import ImageKit from "imagekit-javascript";

interface SalonActionsProps {
  salon: Salon;
}

interface UploadAuthParams {
  signature: string;
  expire: number;
  token: string;
}

export function SalonActions({ salon }: SalonActionsProps) {
  const { getToken } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: salon.name,
    capacity: salon.capacity.toString(),
    imageUrl: salon.imageUrl,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Lütfen sadece resim dosyası seçin.');
        return;
      }
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Dosya boyutu 10MB\'dan büyük olamaz.');
        return;
      }
      setSelectedFile(file);
    }
  };

  const fetchUploadAuthParams = async (): Promise<UploadAuthParams> => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch('http://localhost:3001/uploads/auth', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch upload auth params:', error);
      throw new Error('Failed to get upload authentication parameters');
    }
  };

  const uploadToImageKit = async (file: File, authParams: UploadAuthParams): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Initialize ImageKit
      const imagekit = new ImageKit({
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "YOUR_PUBLIC_KEY",
        urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "YOUR_URL_ENDPOINT",
      });

      // Generate unique filename
      const timestamp = Date.now();
      const fileName = `salon_${salon.id}_${timestamp}_${file.name}`;

      // Upload file to ImageKit
      imagekit.upload({
        file: file,
        fileName: fileName,
        signature: authParams.signature,
        expire: authParams.expire,
        token: authParams.token,
        folder: "/salons", // Organize uploads in a folder
      }, (err: any, result: any) => {
        if (err) {
          console.error('ImageKit upload error:', err);
          reject(new Error('Failed to upload image to ImageKit'));
        } else {
          console.log('ImageKit upload success:', result);
          resolve(result.url);
        }
      });
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsUploading(true);
      setUploadProgress(10);

      let finalImageUrl = formData.imageUrl;

      // If a file is selected, upload it first
      if (selectedFile) {
        setUploadProgress(20);
        
        // Step A: Fetch authentication parameters
        const authParams = await fetchUploadAuthParams();
        setUploadProgress(40);

        // Step B: Upload to ImageKit
        const newImageUrl = await uploadToImageKit(selectedFile, authParams);
        setUploadProgress(70);
        
        finalImageUrl = newImageUrl;
      }

      // Step C: Update salon with new data
      await updateSalon({
        id: salon.id,
        name: formData.name,
        capacity: parseInt(formData.capacity, 10),
        imageUrl: finalImageUrl,
      });

      setUploadProgress(100);
      setIsEditOpen(false);
      setSelectedFile(null);
      
      // Reset form data to updated salon data
      setFormData({
        name: formData.name,
        capacity: formData.capacity,
        imageUrl: finalImageUrl,
      });

    } catch (error) {
      console.error("Error updating salon:", error);
      alert("Salon güncellenirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
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
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Salon Adı</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                disabled={isUploading}
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
                disabled={isUploading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Mevcut Resim URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                required
                disabled={isUploading}
              />
            </div>

            {/* New File Upload Field */}
            <div className="space-y-2">
              <Label htmlFor="newImage">Salonu Yeni Resmi</Label>
              <Input
                id="newImage"
                name="newImage"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Seçilen dosya: {selectedFile.name}
                </p>
              )}
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Yükleniyor... {uploadProgress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? "Kaydediliyor..." : "Kaydet"}
              </Button>
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