/*
  Warnings:

  - The primary key for the `event_register` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `create_by` on the `event_register` table. All the data in the column will be lost.
  - You are about to drop the column `registerStatus` on the `event_register` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `event_register` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `event_register` table. All the data in the column will be lost.
  - You are about to drop the column `orderdetail` on the `orderdetail` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `productItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal(10,2)`.
  - You are about to drop the `transaction` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[eventPaymentId]` on the table `event_register` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[locationid]` on the table `event_register` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `onWeb` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deposit` to the `event_register` table without a default value. This is not possible if the table is not empty.
  - The required column `eventPaymentId` was added to the `event_register` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `locationid` to the `event_register` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `event_register` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderDetailId` to the `orderdetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "event_register_eventid_key";

-- DropIndex
DROP INDEX "event_register_vendorid_key";

-- AlterTable
ALTER TABLE "event" ADD COLUMN     "onWeb" BYTEA NOT NULL,
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "event_register" DROP CONSTRAINT "event_register_pkey",
DROP COLUMN "create_by",
DROP COLUMN "registerStatus",
DROP COLUMN "updated_at",
DROP COLUMN "updated_by",
ADD COLUMN     "deposit" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "depositpaymentdate" DATE,
ADD COLUMN     "eventPaymentId" UUID NOT NULL,
ADD COLUMN     "locationid" UUID NOT NULL,
ADD COLUMN     "status" VARCHAR(50) DEFAULT 'Pending',
ADD COLUMN     "total" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "totalpaymentdate" DATE,
ADD CONSTRAINT "event_register_pkey" PRIMARY KEY ("eventid", "vendorid", "locationid");

-- AlterTable
ALTER TABLE "orderdetail" DROP COLUMN "orderdetail",
ADD COLUMN     "orderDetailId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "productItem" ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "vendor" ADD COLUMN     "status" BOOLEAN DEFAULT true;

-- DropTable
DROP TABLE "transaction";

-- CreateTable
CREATE TABLE "location" (
    "locationid" UUID NOT NULL,
    "eventid" UUID NOT NULL,
    "typeid" UUID NOT NULL,
    "vendorid" UUID NOT NULL,
    "shape" VARCHAR(50) NOT NULL,
    "direction" VARCHAR(50) NOT NULL,
    "x" INTEGER,
    "y" INTEGER,
    "length" INTEGER,
    "width" INTEGER,
    "status" VARCHAR(50),

    CONSTRAINT "location_pkey" PRIMARY KEY ("locationid","eventid","typeid")
);

-- CreateTable
CREATE TABLE "locationtype" (
    "typeid" UUID NOT NULL,
    "eventid" UUID NOT NULL,
    "typename" VARCHAR(50) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "status" VARCHAR(50),

    CONSTRAINT "locationtype_pkey" PRIMARY KEY ("typeid")
);

-- CreateTable
CREATE TABLE "theme" (
    "themeid" UUID NOT NULL,
    "status" BOOLEAN DEFAULT false,

    CONSTRAINT "theme_pkey" PRIMARY KEY ("themeid")
);

-- CreateTable
CREATE TABLE "payment" (
    "transactionid" UUID NOT NULL,
    "orderid" UUID NOT NULL,
    "eventid" UUID NOT NULL,
    "transactiontype" VARCHAR,
    "paymentTime" DATE DEFAULT CURRENT_TIMESTAMP,
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "status" VARCHAR(20) NOT NULL DEFAULT 'pending',

    CONSTRAINT "payment_pkey" PRIMARY KEY ("transactionid","orderid","eventid")
);

-- CreateIndex
CREATE UNIQUE INDEX "location_locationid_key" ON "location"("locationid");

-- CreateIndex
CREATE UNIQUE INDEX "locationtype_typeid_key" ON "locationtype"("typeid");

-- CreateIndex
CREATE UNIQUE INDEX "theme_themeid_key" ON "theme"("themeid");

-- CreateIndex
CREATE UNIQUE INDEX "event_register_eventPaymentId_key" ON "event_register"("eventPaymentId");

-- CreateIndex
CREATE UNIQUE INDEX "event_register_locationid_key" ON "event_register"("locationid");
