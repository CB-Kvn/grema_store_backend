/*
  Warnings:

  - Added the required column `status` to the `Favorites_Carts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favorites_Carts" ADD COLUMN     "status" TEXT NOT NULL;
