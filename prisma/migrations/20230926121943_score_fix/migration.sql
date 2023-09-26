/*
  Warnings:

  - You are about to drop the column `LocalId` on the `score` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `score` DROP FOREIGN KEY `Score_LocalId_fkey`;

-- AlterTable
ALTER TABLE `score` DROP COLUMN `LocalId`,
    ADD COLUMN `localId` INTEGER NULL,
    ADD COLUMN `score` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `Score` ADD CONSTRAINT `Score_localId_fkey` FOREIGN KEY (`localId`) REFERENCES `LocalProfile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
