-- CreateTable
CREATE TABLE "Vender" (
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
    "remark" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vender_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vender_engName_key" ON "Vender"("engName");

-- CreateIndex
CREATE UNIQUE INDEX "Vender_thaiName_key" ON "Vender"("thaiName");
