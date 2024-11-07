/*
  Warnings:

  - You are about to drop the column `create_at` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Staff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "create_at",
DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "status",
DROP COLUMN "updated_at";
