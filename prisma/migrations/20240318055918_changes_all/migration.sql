-- DropIndex
DROP INDEX "Favorites_Carts_productId_key";

-- DropIndex
DROP INDEX "Favorites_Carts_userId_key";

-- DropIndex
DROP INDEX "Inventory_productId_key";

-- AlterTable
ALTER TABLE "Favorites_Carts" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Favorites_Carts_pkey" PRIMARY KEY ("id");
