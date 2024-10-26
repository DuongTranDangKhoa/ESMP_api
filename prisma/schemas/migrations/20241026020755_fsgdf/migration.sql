/*
  Warnings:

  - The primary key for the `menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `vendorineventid` to the `menu` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "menu" DROP CONSTRAINT "menu_menuId_fkey";

-- DropForeignKey
ALTER TABLE "productiteminmenu" DROP CONSTRAINT "productiteminmenu_menuId_fkey";

-- AlterTable
ALTER TABLE "menu" DROP CONSTRAINT "menu_pkey",
ADD COLUMN     "vendorineventid" UUID NOT NULL,
ADD CONSTRAINT "menu_pkey" PRIMARY KEY ("menuId", "vendorineventid");

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_vendorineventid_fkey" FOREIGN KEY ("vendorineventid") REFERENCES "vendorinevent"("vendorinEventId") ON DELETE RESTRICT ON UPDATE CASCADE;
