/*
  Warnings:

  - Added the required column `tipo` to the `Manifestacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Manifestacao" ADD COLUMN     "tipo" TEXT NOT NULL;
