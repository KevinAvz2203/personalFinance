/*
  Warnings:

  - You are about to alter the column `totalAmount` on the `goals` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `currentAmount` on the `goals` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `amount` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `goals` MODIFY `totalAmount` DOUBLE NOT NULL,
    MODIFY `currentAmount` DOUBLE NULL;

-- AlterTable
ALTER TABLE `transactions` MODIFY `amount` DOUBLE NOT NULL;
