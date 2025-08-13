import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const salonData = [
  {
    id: "1",
    imageUrl:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2098&q=80",
    name: "Gül Bahçesi Balo Salonu",
    capacity: 300,
    slug: "gul-bahcesi-balo-salonu",
  },
  {
    id: "2",
    imageUrl:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    name: "Kristal Teras",
    capacity: 150,
    slug: "kristal-teras",
  },
  {
    id: "3",
    imageUrl:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    name: "Bahçe Terası",
    capacity: 200,
    slug: "bahce-terasi",
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.salon.deleteMany();
  console.log('🗑️  Cleared existing salons');

  // Insert seed data
  for (const salon of salonData) {
    await prisma.salon.create({
      data: salon,
    });
  }

  console.log('✅ Seeded salons successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
