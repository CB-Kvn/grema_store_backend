/*
  Warnings:

  - Added the required column `desc` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeDes` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "desc" INTEGER NOT NULL,
ADD COLUMN     "typeDes" TEXT NOT NULL;
