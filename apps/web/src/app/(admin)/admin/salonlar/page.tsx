import { prisma } from "~/lib/db";
import { Button } from "~/components/ui/button";
import type { Salon } from "../../lib/schemas/salon";
import { CreateSalonDialog } from "./_components/create-salon-dialog";
import { EditSalonDialog } from "./_components/edit-salon-dialog";
import { DeleteSalonDialog } from "./_components/delete-salon-dialog";

export default async function SalonlarPage() {
  const salons = await prisma.salon.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Salonları Yönet</h1>
        <CreateSalonDialog />
      </div>

      <div className="border rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="py-3 px-4 text-left font-medium">Salon Adı</th>
              <th className="py-3 px-4 text-left font-medium">Kapasite</th>
              <th className="py-3 px-4 text-left font-medium">Oluşturulma Tarihi</th>
              <th className="py-3 px-4 text-left font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {salons.map((salon: Salon) => (
              <tr key={salon.id} className="border-b last:border-none hover:bg-muted/50">
                <td className="py-3 px-4">{salon.name}</td>
                <td className="py-3 px-4">{salon.capacity} Kişi</td>
                <td className="py-3 px-4">
                  {new Date(salon.createdAt).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <EditSalonDialog salon={salon} />
                    <DeleteSalonDialog salonId={salon.id} salonName={salon.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
