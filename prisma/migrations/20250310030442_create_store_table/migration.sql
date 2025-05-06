-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT,
    "productName" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "sellingPrice" DOUBLE PRECISION,
    "size" TEXT,
    "weight" DOUBLE PRECISION,
    "status" TEXT,
    "remark" TEXT,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "url" TEXT,
    "type" TEXT,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductItem" (
    "id" SERIAL NOT NULL,
    "serialNumber" TEXT,
    "code" TEXT,
    "lot" TEXT,
    "color" TEXT,
    "size" TEXT,
    "quantity" INTEGER,
    "unit" TEXT,
    "mfg" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "exp" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "storeId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "ProductItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "remark" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "storeName" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT,
    "remark" TEXT,
    "storeTypeId" INTEGER NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreType" (
    "id" SERIAL NOT NULL,
    "typeName" TEXT NOT NULL,
    "description" TEXT,
    "remark" TEXT,

    CONSTRAINT "StoreType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_model_key" ON "Product"("model");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Store_storeName_key" ON "Store"("storeName");

-- CreateIndex
CREATE UNIQUE INDEX "StoreType_typeName_key" ON "StoreType"("typeName");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_storeTypeId_fkey" FOREIGN KEY ("storeTypeId") REFERENCES "StoreType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
