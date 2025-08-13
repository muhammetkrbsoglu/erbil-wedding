import type { Salon } from "@acme/types";

export async function getSalons(): Promise<Salon[]> {
  try {
    const response = await fetch('http://localhost:3001/salons', {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const salons = await response.json();
    return salons;
  } catch (error) {
    console.error('Failed to fetch salons:', error);
    // Return empty array as fallback
    return [];
  }
}

export async function getSalonBySlug(slug: string): Promise<Salon | null> {
  try {
    const salons = await getSalons();
    const salon = salons.find(s => s.slug === slug);
    return salon || null;
  } catch (error) {
    console.error('Failed to fetch salon by slug:', error);
    return null;
  }
}
