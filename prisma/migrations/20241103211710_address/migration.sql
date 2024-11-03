/*
  Warnings:

  - You are about to drop the column `city` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `canton` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "city",
ADD COLUMN     "canton" TEXT NOT NULL,
ADD COLUMN     "postal" TEXT NOT NULL;
