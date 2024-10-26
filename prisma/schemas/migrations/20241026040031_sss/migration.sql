/*
  Warnings:

  - Added the required column `vendorId` to the `productItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "productItem" ADD COLUMN     "vendorId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "productItem" ADD CONSTRAINT "productItem_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendor"("vendorid") ON DELETE RESTRICT ON UPDATE CASCADE;
