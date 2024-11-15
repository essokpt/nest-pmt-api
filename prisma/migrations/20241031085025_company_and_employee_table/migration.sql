-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "companyNameThai" TEXT NOT NULL,
    "companyNameEng" TEXT,
    "description" TEXT,
    "address" TEXT,
    "subDistrict" TEXT,
    "district" TEXT,
    "province" TEXT,
    "zipcode" TEXT,
    "taxId" TEXT,
    "phone" TEXT,
    "fax" TEXT,
    "logo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "employeeId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "position" TEXT,
    "department" TEXT,
    "phoneNumber" TEXT,
    "image" TEXT,
    "startDate" TIMESTAMP(3),
    "birthDate" TIMESTAMP(3),
    "age" INTEGER,
    "address" TEXT,
    "education" TEXT,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeId_key" ON "Employee"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");
