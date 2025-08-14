import { z } from "zod";

export const salonSchema = z.object({
  id: z.string(),
  name: z.string().min(3, {
    message: 'Salon adı en az 3 karakter olmalıdır',
  }),
  slug: z.string(),
  description: z.string().min(10, {
    message: 'Açıklama en az 10 karakter olmalıdır',
  }).optional(),
  capacity: z.number().min(1, {
    message: 'Kapasite en az 1 olmalıdır',
  }),
  imageUrl: z.string().url({
    message: 'Geçerli bir URL giriniz',
  }).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Salon = z.infer<typeof salonSchema>;
