-- AlterTable
ALTER TABLE "ProductCategory" ADD COLUMN "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "ArticleCategory" ADD COLUMN "active" BOOLEAN NOT NULL DEFAULT true;
