/*
  Warnings:

  - You are about to drop the column `adminId` on the `Pedido` table. All the data in the column will be lost.
  - You are about to drop the column `instituicaoId` on the `Pedido` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adminCPF]` on the table `Pedido` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminCPF` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instituicaoCNPJ` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_instituicaoId_fkey";

-- DropIndex
DROP INDEX "Pedido_adminId_key";

-- AlterTable
ALTER TABLE "Pedido" DROP COLUMN "adminId",
DROP COLUMN "instituicaoId",
ADD COLUMN     "adminCPF" TEXT NOT NULL,
ADD COLUMN     "instituicaoCNPJ" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pedido_adminCPF_key" ON "Pedido"("adminCPF");

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_instituicaoCNPJ_fkey" FOREIGN KEY ("instituicaoCNPJ") REFERENCES "Instituicao"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_adminCPF_fkey" FOREIGN KEY ("adminCPF") REFERENCES "Admin"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
