-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "cpf" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Instituicao" ALTER COLUMN "cnpj" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "cpf" SET DATA TYPE TEXT,
ALTER COLUMN "telefone" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Resumo" (
    "id" SERIAL NOT NULL,
    "criacao" TIMESTAMP(3) NOT NULL,
    "conteudo" TEXT NOT NULL,
    "instituicaoId" INTEGER NOT NULL,

    CONSTRAINT "Resumo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Resumo" ADD CONSTRAINT "Resumo_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
