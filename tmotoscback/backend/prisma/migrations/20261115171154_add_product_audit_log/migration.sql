-- CreateEnum
CREATE TYPE "ProductAuditAction" AS ENUM ('CREATED', 'UPDATED', 'STATUS_CHANGED');

-- CreateTable
CREATE TABLE "product_audit_logs" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "productName" TEXT,
    "actorEmail" TEXT NOT NULL,
    "action" "ProductAuditAction" NOT NULL,
    "changedFields" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "before" JSONB,
    "after" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "product_audit_logs_productId_createdAt_idx" ON "product_audit_logs"("productId", "createdAt");

-- CreateIndex
CREATE INDEX "product_audit_logs_createdAt_idx" ON "product_audit_logs"("createdAt");
