/*
  Warnings:

  - You are about to drop the `ProductItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event_register` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderdetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "config_pkey";

-- AlterTable
ALTER TABLE "config" ADD CONSTRAINT "config_pkey" PRIMARY KEY ("configid");

-- DropTable
DROP TABLE "ProductItem";

-- DropTable
DROP TABLE "event";

-- DropTable
DROP TABLE "event_register";

-- DropTable
DROP TABLE "order";

-- DropTable
DROP TABLE "orderdetail";

-- DropTable
DROP TABLE "product";

-- DropTable
DROP TABLE "vendor";

-- CreateTable
CREATE TABLE "admin" (
    "userid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" VARCHAR(40) NOT NULL,
    "password" VARCHAR(40) NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "create_by" VARCHAR(40) DEFAULT 'undefined',
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(40) DEFAULT 'undefined',

    CONSTRAINT "admin_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "host" (
    "hostid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" VARCHAR(40) NOT NULL,
    "password" VARCHAR(40) NOT NULL,
    "hostname" VARCHAR(100) DEFAULT '',
    "contract_start_date" DATE,
    "contract_end_date" DATE,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "create_by" VARCHAR(40) DEFAULT 'undefined',
    "updated_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(40) DEFAULT 'undefined',
    "hostcode" VARCHAR(8) NOT NULL,

    CONSTRAINT "host_pkey" PRIMARY KEY ("hostid")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_username_key" ON "admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "host_username_key" ON "host"("username");

-- CreateIndex
CREATE UNIQUE INDEX "host_hostcode_key" ON "host"("hostcode");
