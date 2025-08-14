import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { getSalons } from "../../../../lib/api";
import { AddSalonForm } from "./add-salon-form";
import { SalonActions } from "./salon-actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminSalonsPage() {
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
  const salons = await getSalons();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold font-playfair text-foreground">
          Salonları Yönet
        </h1>
        <AddSalonForm />
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Salon Adı</TableHead>
              <TableHead>Kapasite</TableHead>
              <TableHead>Oluşturulma Tarihi</TableHead>
              <TableHead className="text-right">Eylemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salons.map((salon) => (
              <TableRow key={salon.id}>
                <TableCell>{salon.name}</TableCell>
                <TableCell>{salon.capacity}</TableCell>
                <TableCell>
                  {salon.createdAt ? new Date(salon.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <SalonActions salon={salon} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


