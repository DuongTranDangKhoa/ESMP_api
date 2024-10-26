/*
  Warnings:

  - The primary key for the `menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `vendorineventid` on the `menu` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "menu" DROP CONSTRAINT "menu_vendorineventid_fkey";

-- AlterTable
ALTER TABLE "menu" DROP CONSTRAINT "menu_pkey",
DROP COLUMN "vendorineventid",
ADD CONSTRAINT "menu_pkey" PRIMARY KEY ("menuId");

-- AddForeignKey
ALTER TABLE "productiteminmenu" ADD CONSTRAINT "productiteminmenu_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("menuId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "vendorinevent"("vendorinEventId") ON DELETE RESTRICT ON UPDATE CASCADE;
