/*
  Warnings:

  - You are about to alter the column `amount` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `tax` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `shipping` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `price` on the `InvoiceDetail` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - A unique constraint covering the columns `[orderNumber]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderNumber` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeShipping` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeUser` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderNumber` to the `InvoiceDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `InvoiceDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InvoiceDetail" DROP CONSTRAINT "InvoiceDetail_invoiceId_fkey";

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "address" TEXT,
ADD COLUMN     "confirmation" TEXT,
ADD COLUMN     "idGues" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "orderNumber" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "typeShipping" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "typeUser" TEXT NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "tax" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "shipping" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "pdf" DROP NOT NULL;

-- AlterTable
ALTER TABLE "InvoiceDetail" ADD COLUMN     "orderNumber" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ALTER COLUMN "invoiceId" DROP NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_orderNumber_key" ON "Invoice"("orderNumber");

-- AddForeignKey
ALTER TABLE "InvoiceDetail" ADD CONSTRAINT "InvoiceDetail_orderNumber_fkey" FOREIGN KEY ("orderNumber") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
