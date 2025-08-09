/*
  Warnings:

  - You are about to drop the column `price` on the `Menu` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[brandId,name]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cheapestMenuPrice` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logoUrl` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxDiscount` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `officialPrice` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Brand" ADD COLUMN     "cheapestMenuPrice" INTEGER NOT NULL,
ADD COLUMN     "isLowCost" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPopular" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "logoUrl" TEXT NOT NULL,
ADD COLUMN     "maxDiscount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Menu" DROP COLUMN "price",
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "isPopular" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "officialPrice" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."AppPrice" (
    "id" SERIAL NOT NULL,
    "appName" TEXT NOT NULL,
    "appLogoUrl" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "discountInfo" TEXT,
    "menuId" INTEGER NOT NULL,

    CONSTRAINT "AppPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Menu_brandId_name_key" ON "public"."Menu"("brandId", "name");

-- AddForeignKey
ALTER TABLE "public"."AppPrice" ADD CONSTRAINT "AppPrice_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "public"."Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
