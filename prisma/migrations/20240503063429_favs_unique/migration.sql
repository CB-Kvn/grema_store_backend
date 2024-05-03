/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `Favorites_Carts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favorites_Carts_productId_key" ON "Favorites_Carts"("productId");
