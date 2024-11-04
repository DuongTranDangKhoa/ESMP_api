/*
  Warnings:

  - You are about to drop the column `logo` on the `event` table. All the data in the column will be lost.
  - The `onweb` column on the `event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `direction` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `eventid` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `length` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `vendorid` on the `location` table. All the data in the column will be lost.
  - The primary key for the `vendorinevent` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "category" ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "event" DROP COLUMN "logo",
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "hostid" UUID,
ADD COLUMN     "stagevalue" VARCHAR,
ADD COLUMN     "themeid" UUID,
ADD COLUMN     "thumbnail" VARCHAR,
ADD COLUMN     "width" INTEGER,
DROP COLUMN "onweb",
ADD COLUMN     "onweb" BOOLEAN;

-- AlterTable
ALTER TABLE "location" DROP COLUMN "direction",
DROP COLUMN "eventid",
DROP COLUMN "length",
DROP COLUMN "vendorid",
ADD COLUMN     "heigth" INTEGER,
ADD COLUMN     "rotation" INTEGER,
ALTER COLUMN "shape" SET DEFAULT 'shape';

-- AlterTable
ALTER TABLE "locationtype" ALTER COLUMN "typename" DROP NOT NULL;

-- AlterTable
ALTER TABLE "vendorinevent" DROP CONSTRAINT "vendorinevent_pkey",
ADD CONSTRAINT "vendorinevent_pkey" PRIMARY KEY ("vendorinEventId");

-- CreateTable
CREATE TABLE "account" (
    "userid" UUID NOT NULL,
    "username" VARCHAR(40) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "role" VARCHAR(10) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "create_at" DATE,
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(10) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "SessionData" (
    "accessToken" UUID NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "expiredAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL,
    "sessionInfo" JSONB NOT NULL,

    CONSTRAINT "SessionData_pkey" PRIMARY KEY ("accessToken")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_username_key" ON "account"("username");

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_typeid_fkey" FOREIGN KEY ("typeid") REFERENCES "locationtype"("typeid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locationtype" ADD CONSTRAINT "locationtype_eventid_fkey" FOREIGN KEY ("eventid") REFERENCES "event"("eventid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "category"("categoryid") ON DELETE RESTRICT ON UPDATE CASCADE;
