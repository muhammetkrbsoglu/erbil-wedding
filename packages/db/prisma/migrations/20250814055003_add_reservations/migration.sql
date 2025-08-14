-- CreateTable
CREATE TABLE "reservations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "eventDateRange" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "salonId" TEXT NOT NULL,
    CONSTRAINT "reservations_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "salons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
