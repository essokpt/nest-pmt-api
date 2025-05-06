/*
  Warnings:

  - Added the required column `stockId` to the `ProductItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductItem" ADD COLUMN     "stockId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "stockBy" TEXT,
    "noted" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
