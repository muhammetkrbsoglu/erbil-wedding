import { PrismaClient } from '@acme/db';

async function testDatabase() {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: 'file:../../packages/db/dev.db'
      }
    }
  });

  try {
    console.log('Testing database connection...');
    const salons = await prisma.salon.findMany();
    console.log('✅ Database connected successfully!');
    console.log('Found salons:', salons.length);
    console.log('Salons:', salons.map(s => ({ id: s.id, name: s.name })));
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
