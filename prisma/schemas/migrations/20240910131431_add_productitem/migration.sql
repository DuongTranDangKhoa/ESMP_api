/*
  Warnings:

  - The primary key for the `config` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `host` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[configid]` on the table `config` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "config" DROP CONSTRAINT "config_pkey";

-- DropTable
DROP TABLE "admin";

-- DropTable
DROP TABLE "host";

-- CreateTable
CREATE TABLE "event" (
    "eventid" UUID NOT NULL,
    "eventname" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "startdate" DATE,
    "enddate" DATE,
    "status" INTEGER DEFAULT 0,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "create_by" VARCHAR(40) DEFAULT 'undefined',
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(40) DEFAULT 'undefined'
);

-- CreateTable
CREATE TABLE "event_register" (
    "eventid" UUID NOT NULL,
    "vendorid" UUID NOT NULL,
    "registerStatus" INTEGER DEFAULT 0,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "create_by" VARCHAR(40) DEFAULT 'undefined',
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(40) DEFAULT 'undefined',

    CONSTRAINT "event_register_pkey" PRIMARY KEY ("eventid","vendorid")
);

-- CreateTable
CREATE TABLE "vendor" (
    "vendorid" UUID NOT NULL,
    "username" VARCHAR(40) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "vendorname" VARCHAR(500),
    "category" VARCHAR(40) DEFAULT '',
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "create_by" VARCHAR(40) DEFAULT 'undefined',
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(40) DEFAULT 'undefined'
);

-- CreateTable
CREATE TABLE "order" (
    "orderid" UUID NOT NULL,
    "eventid" UUID NOT NULL,
    "vendorid" VARCHAR(100) NOT NULL,
    "total" DECIMAL(12,4) NOT NULL,
    "issueat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "create_by" VARCHAR(40) DEFAULT 'undefined',
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(40) DEFAULT 'undefined',

    CONSTRAINT "order_pkey" PRIMARY KEY ("orderid","eventid","vendorid")
);

-- CreateTable
CREATE TABLE "orderdetail" (
    "eventid" UUID NOT NULL,
    "vendorid" VARCHAR(100) NOT NULL,
    "orderid" UUID NOT NULL,
    "row_no" INTEGER NOT NULL,
    "amount" DECIMAL(8,0) NOT NULL,
    "itemname" TEXT NOT NULL,
    "itemprice" DECIMAL(12,4) NOT NULL,
    "totalprice" DECIMAL(12,4) NOT NULL,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "create_by" VARCHAR(40) DEFAULT 'undefined',
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(40) DEFAULT 'undefined',

    CONSTRAINT "orderdetail_pkey" PRIMARY KEY ("eventid","vendorid","orderid","row_no")
);

-- CreateTable
CREATE TABLE "product" (
    "productid" UUID NOT NULL,
    "vendorid" UUID NOT NULL,
    "productname" VARCHAR(256) NOT NULL,
    "productprice" DECIMAL(12,4) NOT NULL DEFAULT 0.00,
    "description" TEXT,
    "is_selling" BOOLEAN DEFAULT false,
    "quantity" DECIMAL(12,0) NOT NULL DEFAULT 0.00,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "create_by" VARCHAR(40) DEFAULT 'undefined',
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(40) DEFAULT 'undefined',

    CONSTRAINT "product_pkey" PRIMARY KEY ("productid","vendorid")
);

-- CreateTable
CREATE TABLE "ProductItem" (
    "Guid" UUID NOT NULL,
    "productid" UUID NOT NULL,
    "vendorid" UUID NOT NULL,
    "name" VARCHAR(253) NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "type" VARCHAR(300) NOT NULL,
    "price" DECIMAL(12,0) NOT NULL,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductItem_pkey" PRIMARY KEY ("productid","vendorid")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_pkey" ON "event"("eventid");

-- CreateIndex
CREATE UNIQUE INDEX "event_register_eventid_key" ON "event_register"("eventid");

-- CreateIndex
CREATE UNIQUE INDEX "event_register_vendorid_key" ON "event_register"("vendorid");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_pkey_unique" ON "vendor"("vendorid");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_username_key" ON "vendor"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ProductItem_Guid_key" ON "ProductItem"("Guid");

-- CreateIndex
CREATE UNIQUE INDEX "config_pkey" ON "config"("configid");
