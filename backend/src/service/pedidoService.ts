import { prisma } from "../lib/prisma";

export class PedidoService {
    async create(data: {
        adminCPF: string;
        instituicaoCNPJ: string;
    }) {
        try {
            const pedido = await prisma.pedido.create({
                data: {
                    adminCPF: data.adminCPF,
                    instituicaoCNPJ: data.instituicaoCNPJ
                }
            });
            return pedido;
        } catch (error) {
            throw error;
        }
    }

    async findByCpf(cpf: string) {
        try {
            const pedido = await prisma.pedido.findFirst({
                where:
                    { adminCPF: cpf }
            });
            return pedido;
        } catch (error) {
            throw error;
        }
    }

    async findAllByCnpj(cnpj: string) {
        try {
            const pedido = await prisma.pedido.findMany({
                where:
                    { instituicaoCNPJ: cnpj }
            });
            return pedido;
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number) {
        try {
            const pedido = await prisma.pedido.findFirst({
                where:
                    { id }
            });
            return pedido;
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            const pedidos = await prisma.pedido.findMany();
            return pedidos;
        } catch (error) {
            throw error;
        }
    }

    async delete(cpf: string) {
        try {
            await prisma.pedido.delete({
                where: {
                    adminCPF: cpf,
                },
            });
        } catch (error) {
            throw error;
        }
    }
}

