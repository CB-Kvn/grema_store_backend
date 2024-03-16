/*
  Warnings:

  - You are about to drop the column `descripcion` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Product` table. All the data in the column will be lost.
  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "descripcion",
DROP COLUMN "nombre",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
