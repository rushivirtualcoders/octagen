-- CreateEnum
CREATE TYPE "VehiclePath" AS ENUM ('CAR', 'BIKE');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO');

-- AlterTable ProductCategory: vehicle path for Car / Bike product groups
ALTER TABLE "ProductCategory" ADD COLUMN "vehiclePath" "VehiclePath" NOT NULL DEFAULT 'CAR';

-- AlterTable Product: external LIQUI MOLY URL + Most Loved flag
ALTER TABLE "Product" ADD COLUMN "liquiMolyUrl" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Product" ADD COLUMN "loved" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "ProductCategory_vehiclePath_active_idx" ON "ProductCategory"("vehiclePath", "active");

-- CreateIndex
CREATE INDEX "Product_loved_published_idx" ON "Product"("loved", "published");

-- CreateTable
CREATE TABLE "MarketingMedia" (
    "id" TEXT NOT NULL,
    "type" "MediaType" NOT NULL DEFAULT 'IMAGE',
    "src" TEXT NOT NULL,
    "poster" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL,
    "caption" TEXT NOT NULL DEFAULT '',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketingMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketingActivity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "href" TEXT NOT NULL DEFAULT '',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketingActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MarketingMedia_published_sortOrder_idx" ON "MarketingMedia"("published", "sortOrder");

-- CreateIndex
CREATE INDEX "MarketingActivity_published_sortOrder_idx" ON "MarketingActivity"("published", "sortOrder");
