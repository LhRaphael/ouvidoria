import { prisma } from "../lib/prisma";

export class InstituicaoService {
    async create(data: {
        nome: string;
        cnpj: string;
        sede: string;
    }) {
        const instituicao = await prisma.instituicao.create({
            data: {
                nome: data.nome,
                cnpj: data.cnpj,
                sede: data.sede,
            },
        });

        return instituicao;
    }

    async findByCnpj(cnpj: string) {
        const instituicao = await prisma.instituicao.findUnique({
            where: {
                cnpj,
            },
        });

        return instituicao;
    }

    async findById(id: number) {
        const instituicao = await prisma.instituicao.findUnique({
            where: {
                id,
            },
        });

        return instituicao;
    }

    async findAll() {
        const instituicoes = await prisma.instituicao.findMany();
        return instituicoes;
    }

    async delete(id: number) {
        await prisma.instituicao.delete({
            where: {
                id,
            },
        });
    }
}