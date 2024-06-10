/*
  Warnings:

  - You are about to drop the column `productId` on the `InvoiceDetail` table. All the data in the column will be lost.
  - Added the required column `inventorytId` to the `InvoiceDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InvoiceDetail" DROP CONSTRAINT "InvoiceDetail_productId_fkey";

-- AlterTable
ALTER TABLE "InvoiceDetail" DROP COLUMN "productId",
ADD COLUMN     "inventorytId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "InvoiceDetail" ADD CONSTRAINT "InvoiceDetail_inventorytId_fkey" FOREIGN KEY ("inventorytId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
