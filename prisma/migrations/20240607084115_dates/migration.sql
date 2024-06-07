/*
  Warnings:

  - The primary key for the `InvoiceDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `InvoiceDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "createAtProfile" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Inventory" ALTER COLUMN "createAtProductInventory" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "createAtInvoice" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "InvoiceDetail" DROP CONSTRAINT "InvoiceDetail_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "createAtInvoiceDetail" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "InvoiceDetail_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "createAtProduct" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "createAtProfile" SET DEFAULT CURRENT_TIMESTAMP;
