"use client";

import { Badge } from "../../../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { updateReservationStatus } from "../../../../lib/actions";
import { ChevronDown } from "lucide-react";

interface Reservation {
  id: string;
  status: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventDateRange: string;
  eventType: string;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  salonId: string;
  salon: {
    id: string;
    name: string;
    slug: string;
    capacity: number;
  imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

interface UpdateStatusFormProps {
  reservation: Reservation;
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'pending':
      return <Badge variant="warning">Beklemede</Badge>;
    case 'confirmed':
      return <Badge variant="success">Onaylandı</Badge>;
    case 'cancelled':
      return <Badge variant="destructive">İptal Edildi</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function getStatusOptions(currentStatus: string) {
  const allOptions = [
    { value: 'pending', label: 'Beklemede', variant: 'warning' as const },
    { value: 'confirmed', label: 'Onaylandı', variant: 'success' as const },
    { value: 'cancelled', label: 'İptal Edildi', variant: 'destructive' as const },
  ];

  // Filter out the current status from options
  return allOptions.filter(option => option.value !== currentStatus);
}

export function UpdateStatusForm({ reservation }: UpdateStatusFormProps) {
  const statusOptions = getStatusOptions(reservation.status);

  if (statusOptions.length === 0) {
    // If no other status options are available, just show the current status
    return getStatusBadge(reservation.status);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md">
          {getStatusBadge(reservation.status)}
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {statusOptions.map((option) => (
          <DropdownMenuItem key={option.value} asChild>
            <form action={updateReservationStatus} className="w-full">
              <input type="hidden" name="reservationId" value={reservation.id} />
              <input type="hidden" name="newStatus" value={option.value} />
              <button
                type="submit"
                className="w-full text-left px-0 py-0 border-0 bg-transparent cursor-pointer hover:bg-transparent"
              >
                <Badge variant={option.variant} className="w-full justify-start">
                  {option.label}
                </Badge>
              </button>
            </form>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
