/*
  Warnings:

  - You are about to drop the column `name` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `roomKey` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `adults` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPhone` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomType` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkIn" DATETIME NOT NULL,
    "checkOut" DATETIME NOT NULL,
    "roomType" TEXT NOT NULL,
    "adults" INTEGER NOT NULL,
    "children" INTEGER NOT NULL DEFAULT 0,
    "breakfast" BOOLEAN NOT NULL DEFAULT false,
    "arrivalPeriod" TEXT,
    "transport" TEXT,
    "parkingNeed" BOOLEAN NOT NULL DEFAULT false,
    "contactName" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "specialRequest" TEXT
);
INSERT INTO "new_Booking" ("checkIn", "checkOut", "createdAt", "id") SELECT "checkIn", "checkOut", "createdAt", "id" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE INDEX "Booking_roomType_checkIn_checkOut_idx" ON "Booking"("roomType", "checkIn", "checkOut");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
