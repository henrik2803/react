/*
  Warnings:

  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "badges" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "condition" TEXT,
ADD COLUMN     "coverUrl" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "feedEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "feedFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "feedOrder" INTEGER,
ADD COLUMN     "feedText" TEXT,
ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "installmentCount" INTEGER,
ADD COLUMN     "installmentEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "installmentValue" DECIMAL(10,2),
ADD COLUMN     "oldPrice" DECIMAL(10,2),
ADD COLUMN     "purchasableOnline" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requestQuote" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "seoDescription" TEXT,
ADD COLUMN     "seoTitle" TEXT,
ADD COLUMN     "shortDescription" TEXT,
ADD COLUMN     "specs" JSONB,
ADD COLUMN     "stockAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "stockQuantity" INTEGER,
ADD COLUMN     "subcategory" TEXT,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "testRide" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "videoUrl" TEXT,
ADD COLUMN     "whatsapp" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);
