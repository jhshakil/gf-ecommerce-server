/*
  Warnings:

  - Added the required column `image` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categories` ADD COLUMN `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `customers` ADD COLUMN `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `image` VARCHAR(191) NOT NULL;
