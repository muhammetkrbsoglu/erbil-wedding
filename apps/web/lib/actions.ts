"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

// For now, we'll use a simple API call instead of direct Prisma
// since our API server is working with Express
async function createSalonInAPI(salonData: {
  name: string;
  slug: string;
  capacity: number;
  imageUrl: string;
}) {
  try {
    const response = await fetch("http://localhost:3001/salons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(salonData),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to create salon:", error);
    throw new Error("Failed to create salon");
  }
}

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

export async function createSalon(formData: FormData) {
  // Check authentication
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Extract form data
  const name = formData.get("name") as string;
  const capacityStr = formData.get("capacity") as string;
  const imageUrl = formData.get("imageUrl") as string;

  // Validate required fields
  if (!name || !capacityStr || !imageUrl) {
    throw new Error("All fields are required");
  }

  const capacity = parseInt(capacityStr, 10);
  if (isNaN(capacity) || capacity <= 0) {
    throw new Error("Capacity must be a positive number");
  }

  // Create slug from name
  const slug = createSlug(name);

  try {
    // Create salon via API
    await createSalonInAPI({
      name,
      slug,
      capacity,
      imageUrl,
    });

    // Revalidate the salons page to show updated data
    revalidatePath("/admin/salonlar");
    
    return { success: true, message: "Salon created successfully" };
  } catch (error) {
    console.error("Error creating salon:", error);
    throw new Error("Failed to create salon");
  }
}
