/*
  Warnings:

  - You are about to drop the column `address` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `addressComplete` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nation` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "address",
ADD COLUMN     "addressComplete" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "nation" TEXT NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL;
