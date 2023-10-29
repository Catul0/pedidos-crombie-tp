/*
  Warnings:

  - You are about to alter the column `status` on the `orderstatus` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `orderstatus` MODIFY `status` ENUM('PENDIENTE', 'RECHAZADO', 'ACEPTADO', 'PREPARANDO', 'COCINADO', 'EN_CAMINO', 'RECIBIDO') NOT NULL DEFAULT 'PENDIENTE';
