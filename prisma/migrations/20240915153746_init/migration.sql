-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_buyerId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "buyerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Reviews" ALTER COLUMN "buyerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
