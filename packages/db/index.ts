// Placeholder db package to avoid circular imports
// This will be replaced with proper Prisma client when the issue is resolved

export const db = {
  // Placeholder methods - will be replaced with actual Prisma client
  reservation: {
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
  },
  salon: {
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
  },
} as any;

// Export types from the generated client (these should work)
export * from './index.js';
