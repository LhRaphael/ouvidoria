-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "instituicaoId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Pedido_adminId_key" ON "Pedido"("adminId");

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
