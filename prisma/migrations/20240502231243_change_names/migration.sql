/*
  Warnings:

  - You are about to drop the column `createAtUsers` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `updateAtUsers` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `createAtProfile` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updateAtProfile` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "createAtUsers",
DROP COLUMN "updateAtUsers",
ADD COLUMN     "createAtProductInventory" TIMESTAMP(3),
ADD COLUMN     "updateAtProductInventory" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "createAtProfile",
DROP COLUMN "updateAtProfile",
ADD COLUMN     "createAtProduct" TIMESTAMP(3),
ADD COLUMN     "updateAtProduct" TIMESTAMP(3);
