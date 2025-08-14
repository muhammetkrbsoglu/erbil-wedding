'use server';

import { prisma } from "./db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Rezervasyon durumu güncelleme şeması
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

// İletişim formu şeması ve işlemleri
const contactFormSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  message: z.string().min(10, "Mesajınız en az 10 karakter olmalıdır."),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

type ContactFormState = {
  message: string;
  success?: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};

export async function sendContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    const validatedFields = contactFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Form verileri geçersiz.",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    // Burada e-posta gönderme işlemi yapılacak
    // Örnek: await sendEmail(validatedFields.data);
    await prisma.contact.create({
      data: validatedFields.data,
    });

    revalidatePath("/iletisim");

    return {
      success: true,
      message: "Mesajınız başarıyla gönderildi!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Bir hata oluştu. Lütfen tekrar deneyiniz.",
    };
  }
}
