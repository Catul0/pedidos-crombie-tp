/*
  Warnings:

  - You are about to drop the `orderstatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `orderstatus` DROP FOREIGN KEY `OrderStatus_deliveryId_fkey`;

-- DropForeignKey
ALTER TABLE `orderstatus` DROP FOREIGN KEY `OrderStatus_foodId_fkey`;

-- DropForeignKey
ALTER TABLE `orderstatus` DROP FOREIGN KEY `OrderStatus_sellerId_fkey`;

-- DropForeignKey
ALTER TABLE `orderstatus` DROP FOREIGN KEY `OrderStatus_userId_fkey`;

-- DropTable
DROP TABLE `orderstatus`;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('PENDIENTE', 'RECHAZADO', 'ACEPTADO', 'PREPARANDO', 'COCINADO', 'EN_CAMINO', 'RECIBIDO') NOT NULL DEFAULT 'PENDIENTE',
    `orderDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateStatus` DATETIME(3) NOT NULL,
    `sellerId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `deliveryId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_OrderToProduct` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_OrderToProduct_AB_unique`(`A`, `B`),
    INDEX `_OrderToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `LocalProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_deliveryId_fkey` FOREIGN KEY (`deliveryId`) REFERENCES `DeliveryDriverProfile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToProduct` ADD CONSTRAINT `_OrderToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToProduct` ADD CONSTRAINT `_OrderToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
