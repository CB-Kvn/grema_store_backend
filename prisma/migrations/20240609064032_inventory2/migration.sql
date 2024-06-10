/*
  Warnings:

  - You are about to drop the column `inventorytId` on the `InvoiceDetail` table. All the data in the column will be lost.
  - Added the required column `inventoryId` to the `InvoiceDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InvoiceDetail" DROP CONSTRAINT "InvoiceDetail_inventorytId_fkey";

-- AlterTable
ALTER TABLE "InvoiceDetail" DROP COLUMN "inventorytId",
ADD COLUMN     "inventoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "InvoiceDetail" ADD CONSTRAINT "InvoiceDetail_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
