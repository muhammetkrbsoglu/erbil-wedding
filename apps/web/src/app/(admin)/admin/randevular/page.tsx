import { prisma } from "~/lib/db";
import { UpdateStatusDropdown } from "./_components/update-status-dropdown";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

interface Salon {
  name: string;
}

interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  salon: Salon;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: Date;
  notes: string | null;
}

export default async function RandevularPage() {
  const reservations: Reservation[] = await prisma.reservation.findMany({
    include: {
      salon: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Randevuları Yönet</h1>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Müşteri Adı</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Salon Adı</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Talep Tarihi</TableHead>
              <TableHead>Not</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.customerName}</TableCell>
                <TableCell>{reservation.customerPhone}</TableCell>
                <TableCell>{reservation.salon.name}</TableCell>
                <TableCell>
                  <UpdateStatusDropdown 
                    reservationId={reservation.id} 
                    currentStatus={reservation.status} 
                  />
                </TableCell>
                <TableCell>
                  {new Date(reservation.createdAt).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {reservation.notes}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
