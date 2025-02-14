-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "engName" TEXT NOT NULL,
    "thaiName" TEXT NOT NULL,
    "shortName" TEXT,
    "address" TEXT NOT NULL,
    "subdistrict" TEXT,
    "district" TEXT,
    "province" TEXT,
    "zipcode" TEXT,
    "description" TEXT,
    "phone" TEXT,
    "fax" TEXT,
    "mobile" TEXT,
    "taxId" TEXT,
    "contactName" TEXT,
    "contactMobile" TEXT,
    "contactEmail" TEXT,
    "distance" INTEGER,
    "remark" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_engName_key" ON "Customer"("engName");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_thaiName_key" ON "Customer"("thaiName");
