/*
  Warnings:

  - You are about to drop the column `create_by` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `issueat` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `order` table. All the data in the column will be lost.
  - The primary key for the `orderdetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `amount` on the `orderdetail` table. All the data in the column will be lost.
  - You are about to drop the column `create_by` on the `orderdetail` table. All the data in the column will be lost.
  - You are about to drop the column `itemname` on the `orderdetail` table. All the data in the column will be lost.
  - You are about to drop the column `itemprice` on the `orderdetail` table. All the data in the column will be lost.
  - You are about to drop the column `row_no` on the `orderdetail` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `orderdetail` table. All the data in the column will be lost.
  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `create_by` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `is_selling` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `productname` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `productprice` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `vendorid` on the `product` table. All the data in the column will be lost.
  - You are about to alter the column `quantity` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,0)` to `Integer`.
  - You are about to drop the column `create_by` on the `vendor` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `vendor` table. All the data in the column will be lost.
  - You are about to drop the `ProductItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `totalPrice` to the `order` table without a default value. This is not possible if the table is not empty.
  - The required column `orderdetail` was added to the `orderdetail` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `unitPrice` to the `orderdetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryid` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "create_by",
DROP COLUMN "issueat",
DROP COLUMN "total",
DROP COLUMN "updated_by",
ADD COLUMN     "totalPrice" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "totalamount" INTEGER;

-- AlterTable
ALTER TABLE "orderdetail" DROP CONSTRAINT "orderdetail_pkey",
DROP COLUMN "amount",
DROP COLUMN "create_by",
DROP COLUMN "itemname",
DROP COLUMN "itemprice",
DROP COLUMN "row_no",
DROP COLUMN "updated_by",
ADD COLUMN     "orderdetail" UUID NOT NULL,
ADD COLUMN     "quantity" INTEGER,
ADD COLUMN     "unitPrice" DECIMAL(10,2) NOT NULL,
ADD CONSTRAINT "orderdetail_pkey" PRIMARY KEY ("eventid", "vendorid", "orderid");

-- AlterTable
ALTER TABLE "product" DROP CONSTRAINT "product_pkey",
DROP COLUMN "create_by",
DROP COLUMN "is_selling",
DROP COLUMN "productname",
DROP COLUMN "productprice",
DROP COLUMN "updated_by",
DROP COLUMN "vendorid",
ADD COLUMN     "categoryid" UUID NOT NULL,
ADD COLUMN     "count" INTEGER,
ADD COLUMN     "name" VARCHAR NOT NULL,
ADD COLUMN     "status" BOOLEAN DEFAULT false,
ALTER COLUMN "description" SET DATA TYPE VARCHAR,
ALTER COLUMN "quantity" DROP NOT NULL,
ALTER COLUMN "quantity" DROP DEFAULT,
ALTER COLUMN "quantity" SET DATA TYPE INTEGER,
ADD CONSTRAINT "product_pkey" PRIMARY KEY ("productid");

-- AlterTable
ALTER TABLE "vendor" DROP COLUMN "create_by",
DROP COLUMN "updated_by",
ADD COLUMN     "address" VARCHAR(500),
ADD COLUMN     "email" VARCHAR(100),
ADD COLUMN     "image" VARCHAR,
ADD COLUMN     "phone" VARCHAR(10),
ADD COLUMN     "ulQr" VARCHAR;

-- DropTable
DROP TABLE "ProductItem";

-- CreateTable
CREATE TABLE "productItem" (
    "productItemId" UUID NOT NULL,
    "productid" UUID NOT NULL,
    "vendorid" UUID NOT NULL,
    "name" VARCHAR(253) NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "productorigin" VARCHAR NOT NULL,
    "outofstock" BOOLEAN NOT NULL DEFAULT false,
    "price" DECIMAL(10,0) NOT NULL,
    "unit" VARCHAR(10) NOT NULL,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "productItem_pkey" PRIMARY KEY ("productid","vendorid")
);

-- CreateTable
CREATE TABLE "transaction" (
    "transactionid" UUID NOT NULL,
    "orderid" UUID NOT NULL,
    "eventid" UUID NOT NULL,
    "transactiontype" VARCHAR,
    "paymentTime" DATE DEFAULT CURRENT_TIMESTAMP,
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "status" VARCHAR(20) NOT NULL DEFAULT 'pending',

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("transactionid","orderid","eventid")
);

-- CreateTable
CREATE TABLE "category" (
    "categoryid" UUID NOT NULL,
    "categoryname" VARCHAR(100) NOT NULL,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "category_pkey" PRIMARY KEY ("categoryid")
);

-- CreateTable
CREATE TABLE "menu" (
    "menuid" UUID NOT NULL,
    "eventid" UUID NOT NULL,
    "vendorid" UUID NOT NULL,
    "menuname" VARCHAR(100) NOT NULL,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("menuid","eventid","vendorid")
);

-- CreateIndex
CREATE UNIQUE INDEX "productItem_productItemId_key" ON "productItem"("productItemId");
