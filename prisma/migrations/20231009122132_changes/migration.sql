/*
  Warnings:

  - Added the required column `rol` to the `DeliveryDriverProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rol` to the `LocalProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rol` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `deliverydriverprofile` ADD COLUMN `rol` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `localprofile` ADD COLUMN `rol` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `rol` VARCHAR(191) NOT NULL;
