-- CreateTable
CREATE TABLE "ProductSubcategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductSubcategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductSubcategory_slug_key" ON "ProductSubcategory"("slug");

-- CreateIndex
CREATE INDEX "ProductSubcategory_categoryId_active_idx" ON "ProductSubcategory"("categoryId", "active");

-- CreateIndex
CREATE INDEX "ProductSubcategory_categoryId_sortOrder_idx" ON "ProductSubcategory"("categoryId", "sortOrder");

-- AddForeignKey
ALTER TABLE "ProductSubcategory" ADD CONSTRAINT "ProductSubcategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProductCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN "subcategoryId" TEXT;

-- CreateIndex
CREATE INDEX "Product_subcategoryId_idx" ON "Product"("subcategoryId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "ProductSubcategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
