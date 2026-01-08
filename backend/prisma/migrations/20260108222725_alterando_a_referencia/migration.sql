/*
  Warnings:

  - You are about to drop the column `instituicaoId` on the `Admin` table. All the data in the column will be lost.
  - Added the required column `instituicaoCNPJ` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_instituicaoId_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "instituicaoId",
ADD COLUMN     "instituicaoCNPJ" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_instituicaoCNPJ_fkey" FOREIGN KEY ("instituicaoCNPJ") REFERENCES "Instituicao"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;
