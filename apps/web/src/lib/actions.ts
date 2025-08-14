'use server';

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const updateStatusSchema = z.object({
  reservationId: z.string(),
  status: z.enum(["pending", "confirmed", "cancelled"]),
});

export async function updateReservationStatus(formData: FormData) {
  const data = {
    reservationId: formData.get("reservationId"),
    status: formData.get("status"),
  };

  const parsed = updateStatusSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Geçersiz form verisi");
  }

  await prisma.reservation.update({
    where: { id: parsed.data.reservationId },
    data: { status: parsed.data.status },
  });

  revalidatePath("/admin/randevular");
}
