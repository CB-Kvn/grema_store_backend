/*
  Warnings:

  - The primary key for the `Favorites_Carts` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Favorites_Carts" DROP CONSTRAINT "Favorites_Carts_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Favorites_Carts_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Favorites_Carts_id_seq";
