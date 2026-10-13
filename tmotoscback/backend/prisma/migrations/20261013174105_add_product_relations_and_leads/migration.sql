-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW');

-- CreateEnum
CREATE TYPE "TestRidePeriod" AS ENUM ('MORNING', 'AFTERNOON');

-- CreateTable
CREATE TABLE "quote_leads" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER,
    "productSlug" TEXT NOT NULL,
    "productBrand" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "tradeIn" BOOLEAN NOT NULL DEFAULT false,
    "financing" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quote_leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_ride_leads" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER,
    "productSlug" TEXT NOT NULL,
    "productBrand" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "preferredDate" DATE NOT NULL,
    "period" "TestRidePeriod" NOT NULL,
    "message" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "test_ride_leads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "quote_leads_productId_idx" ON "quote_leads"("productId");

-- CreateIndex
CREATE INDEX "quote_leads_status_idx" ON "quote_leads"("status");

-- CreateIndex
CREATE INDEX "test_ride_leads_productId_idx" ON "test_ride_leads"("productId");

-- CreateIndex
CREATE INDEX "test_ride_leads_status_idx" ON "test_ride_leads"("status");

-- CreateIndex
CREATE INDEX "test_ride_leads_preferredDate_idx" ON "test_ride_leads"("preferredDate");

-- AddForeignKey
ALTER TABLE "quote_leads" ADD CONSTRAINT "quote_leads_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_ride_leads" ADD CONSTRAINT "test_ride_leads_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
