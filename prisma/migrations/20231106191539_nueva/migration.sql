/*
  Warnings:

  - The values [FINALIZADO] on the enum `Order_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `status` ENUM('PENDIENTE', 'RECHAZADO', 'ACEPTADO', 'PREPARANDO', 'COCINADO', 'EN_CAMINO', 'RECIBIDO', 'PUNTUADO') NOT NULL DEFAULT 'PENDIENTE';
