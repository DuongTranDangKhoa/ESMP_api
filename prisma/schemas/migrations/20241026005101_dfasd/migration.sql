/*
  Warnings:

  - You are about to drop the column `menuId` on the `eventpayment` table. All the data in the column will be lost.
  - Added the required column `vendorinEventId` to the `eventpayment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "eventpayment" DROP CONSTRAINT "eventpayment_menuId_fkey";

-- AlterTable
ALTER TABLE "eventpayment" DROP COLUMN "menuId",
ADD COLUMN     "vendorinEventId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "eventpayment" ADD CONSTRAINT "eventpayment_vendorinEventId_fkey" FOREIGN KEY ("vendorinEventId") REFERENCES "vendorinevent"("vendorinEventId") ON DELETE RESTRICT ON UPDATE CASCADE;
