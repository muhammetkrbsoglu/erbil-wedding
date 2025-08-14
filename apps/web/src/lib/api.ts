import { prisma } from "./db";

export async function getSalonBySlug(slug: string) {
  try {
    const salon = await prisma.salon.findUnique({
      where: {
        slug,
      },
    });
    return salon;
  } catch (error) {
    console.error("Error fetching salon:", error);
    return null;
  }
}
