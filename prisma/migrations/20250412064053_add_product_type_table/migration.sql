-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "productTypeId" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productTypeId" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ProductItem" ADD COLUMN     "barCodeUrl" TEXT,
ADD COLUMN     "qrCodeUrl" TEXT,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "stockInValue" DOUBLE PRECISION,
ADD COLUMN     "stockOutValue" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "ProductType" (
    "id" SERIAL NOT NULL,
    "typeName" TEXT NOT NULL,
    "remark" TEXT,
    "image" TEXT,

    CONSTRAINT "ProductType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductType_typeName_key" ON "ProductType"("typeName");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "ProductType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "ProductType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
