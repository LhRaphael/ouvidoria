/*
  Warnings:

  - Added the required column `anonimo` to the `Manifestacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Manifestacao" ADD COLUMN     "anonimo" BOOLEAN NOT NULL;
