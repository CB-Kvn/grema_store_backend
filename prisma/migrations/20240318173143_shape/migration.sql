/*
  Warnings:

  - Added the required column `shape` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "shape" TEXT NOT NULL;
