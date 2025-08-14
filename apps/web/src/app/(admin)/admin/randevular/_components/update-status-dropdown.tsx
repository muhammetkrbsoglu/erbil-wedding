'use client';

import { updateReservationStatus } from "@/lib/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { cn } from "@/lib/utils";

type UpdateStatusDropdownProps = {
  reservationId: string;
  currentStatus: string;
};

const statusVariants = {
  pending: { label: "Beklemede", variant: "default" },
  confirmed: { label: "Onaylandı", variant: "success" },
  cancelled: { label: "İptal Edildi", variant: "destructive" },
} as const;

const statusOptions = Object.entries(statusVariants).map(([key, { label }]) => ({
  value: key,
  label,
}));

export function UpdateStatusDropdown({
  reservationId,
  currentStatus,
}: UpdateStatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleSubmit(formData: FormData) {
    try {
      setIsUpdating(true);
      await updateReservationStatus(formData);
      setIsOpen(false);
    } catch (error) {
      console.error("Status güncellenirken hata:", error);
    } finally {
      setIsUpdating(false);
    }
  }

  const currentVariant = statusVariants[currentStatus as keyof typeof statusVariants];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-auto p-0">
          <Badge
            variant={currentVariant.variant as any}
            className={cn(
              "px-4 py-1 text-xs",
              isUpdating && "opacity-50 cursor-not-allowed"
            )}
          >
            {currentVariant.label}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {statusOptions.map((option) => (
          <form
            key={option.value}
            action={handleSubmit}
            className="px-2 last:pb-2"
          >
            <input type="hidden" name="reservationId" value={reservationId} />
            <input type="hidden" name="status" value={option.value} />
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="w-full justify-start font-normal"
              disabled={option.value === currentStatus || isUpdating}
            >
              {option.label}
            </Button>
          </form>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
