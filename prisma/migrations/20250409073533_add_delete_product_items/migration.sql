-- DropForeignKey
ALTER TABLE "ProductItem" DROP CONSTRAINT "ProductItem_stockId_fkey";

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE CASCADE ON UPDATE CASCADE;
