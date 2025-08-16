import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { db } from "@acme/db";
import type { Reservation, Salon } from "@acme/types";
import { UpdateStatusForm } from "./update-status-form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type ReservationWithSalon = Omit<Reservation, 'createdAt' | 'updatedAt'> & {
  createdAt: Date;
  updatedAt: Date;
  salon: Omit<Salon, 'createdAt' | 'updatedAt'> & {
    createdAt: Date;
    updatedAt: Date;
  };
};

async function getReservations() {
  return await db.reservation.findMany({
    include: {
      salon: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export default async function AdminAppointmentsPage() {
  const { userId, sessionClaims } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const role =
    (sessionClaims?.metadata as any)?.role ||
    (sessionClaims?.publicMetadata as any)?.role;
  if (role !== "admin") {
    redirect("/");
  }
  const reservations = await getReservations();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold font-playfair text-foreground">
          Randevu Taleplerini Yönet
        </h1>
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Müşteri Adı</TableHead>
              <TableHead>E-posta</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>İstenen Tarih</TableHead>
              <TableHead>Etkinlik Türü</TableHead>
              <TableHead>Salon Adı</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Talep Tarihi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Henüz randevu talebi bulunmuyor.
                </TableCell>
              </TableRow>
            ) : (
              reservations.map((reservation: ReservationWithSalon) => (
                <TableRow key={reservation.id}>
                  <TableCell className="font-medium">{reservation.customerName}</TableCell>
                  <TableCell>{reservation.customerEmail}</TableCell>
                  <TableCell>{reservation.customerPhone}</TableCell>
                  <TableCell>{reservation.eventDateRange}</TableCell>
                  <TableCell>{reservation.eventType}</TableCell>
                  <TableCell>{reservation.salon.name}</TableCell>
                  <TableCell><UpdateStatusForm reservation={reservation} /></TableCell>
                  <TableCell>
                    {new Date(reservation.createdAt).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
