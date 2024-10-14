/*
  Warnings:

  - You are about to drop the column `onWeb` on the `event` table. All the data in the column will be lost.
  - Added the required column `onweb` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event" DROP COLUMN "onWeb",
ADD COLUMN     "onweb" BYTEA NOT NULL;

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "name" VARCHAR(250) NOT NULL;

-- CreateTable
CREATE TABLE "Staff" (
    "staffid" UUID NOT NULL,
    "eventid" UUID NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("staffid")
);
