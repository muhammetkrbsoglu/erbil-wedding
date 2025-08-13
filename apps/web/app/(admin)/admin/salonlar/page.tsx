import { PrismaClient } from "@acme/db";
import { Button } from "../../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

const prisma = new PrismaClient();

export default async function AdminSalonsPage() {
  const salons = await prisma.salon.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold font-playfair text-foreground">
          Salonları Yönet
        </h1>
        <Button>Yeni Salon Ekle</Button>
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Salon Adı</TableHead>
              <TableHead>Kapasite</TableHead>
              <TableHead>Oluşturulma Tarihi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salons.map((salon) => (
              <TableRow key={salon.id}>
                <TableCell>{salon.name}</TableCell>
                <TableCell>{salon.capacity}</TableCell>
                <TableCell>
                  {new Date(salon.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


