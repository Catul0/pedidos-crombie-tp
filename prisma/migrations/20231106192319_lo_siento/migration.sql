/*
  Warnings:

  - The values [PUNTUADO] on the enum `Order_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `status` ENUM('PENDIENTE', 'RECHAZADO', 'ACEPTADO', 'PREPARANDO', 'COCINADO', 'EN_CAMINO', 'RECIBIDO', 'PUNTUADOy') NOT NULL DEFAULT 'PENDIENTE';
