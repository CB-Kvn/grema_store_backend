-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL,
    "createAtUsers" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAtUsers" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "rolId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createAtProfile" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAtProfile" TIMESTAMP(3),

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RolUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createAtProfile" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAtProfile" TIMESTAMP(3),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "shape" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createAtProduct" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAtProduct" TIMESTAMP(3),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "image" TEXT[],
    "price" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL,
    "typeDesc" TEXT NOT NULL,
    "desc" INTEGER NOT NULL,
    "createAtProductInventory" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAtProductInventory" TIMESTAMP(3),

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorites_Carts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Favorites_Carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "orderId" TEXT NOT NULL,
    "invoiceNumber" TEXT,
    "subtotal" DECIMAL(65,30) NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "idGues" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "typeUser" TEXT NOT NULL,
    "tax" DECIMAL(65,30) NOT NULL,
    "typeShipping" TEXT NOT NULL,
    "shipping" DECIMAL(65,30) NOT NULL,
    "pdf" TEXT,
    "confirmation" TEXT,
    "taxAmount" DECIMAL(65,30) NOT NULL,
    "discount" DECIMAL(65,30) NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL,
    "createAtInvoice" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAtInvoice" TIMESTAMP(3),

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "InvoiceDetail" (
    "id" SERIAL NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "invoiceId" TEXT,
    "inventoryId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "discount" DECIMAL(65,30) NOT NULL,
    "amountDiscount" DECIMAL(65,30) NOT NULL,
    "porcentageDiscount" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL,
    "createAtInvoiceDetail" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAtInvoiceDetail" TIMESTAMP(3),

    CONSTRAINT "InvoiceDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MantColor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hexaCode" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createAtMantColor" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAtMantColor" TIMESTAMP(3),

    CONSTRAINT "MantColor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MantMaterial" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createAtMantColor" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAtMantColor" TIMESTAMP(3),

    CONSTRAINT "MantMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MantSize" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createAtMantColor" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAtMantColor" TIMESTAMP(3),

    CONSTRAINT "MantSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MantShape" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createAtMantColor" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAtMantColor" TIMESTAMP(3),

    CONSTRAINT "MantShape_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoxPrice" (
    "id" SERIAL NOT NULL,
    "gam" DECIMAL(65,30) NOT NULL,
    "other" DECIMAL(65,30) NOT NULL,
    "createAtMantColor" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAtMantColor" TIMESTAMP(3),

    CONSTRAINT "BoxPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_Carts_id_key" ON "Favorites_Carts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_orderId_key" ON "Invoice"("orderId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "RolUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites_Carts" ADD CONSTRAINT "Favorites_Carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites_Carts" ADD CONSTRAINT "Favorites_Carts_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceDetail" ADD CONSTRAINT "InvoiceDetail_orderNumber_fkey" FOREIGN KEY ("orderNumber") REFERENCES "Invoice"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceDetail" ADD CONSTRAINT "InvoiceDetail_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
