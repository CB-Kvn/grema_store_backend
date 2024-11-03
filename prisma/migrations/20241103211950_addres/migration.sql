/*
  Warnings:

  - You are about to drop the column `nation` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `country` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "nation",
ADD COLUMN     "country" TEXT NOT NULL;
