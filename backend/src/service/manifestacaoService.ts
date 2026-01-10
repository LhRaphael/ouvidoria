import { prisma } from "../lib/prisma";

export class ManifestacaoService {
    async create(data: {
        tipo: string;
        descricao: string;
        arquivo?: string;
        anonimo?: boolean;
        usuarioId: number;
        instituicaoId: number;
    }) {
        const manifest  = await prisma.manifestacao.create({
            data: {
                usuarioId: data.usuarioId,
                tipo: data.tipo,
                anonimo: data.anonimo || false,
                conteudo: data.descricao,
                instituicaoId: data.instituicaoId,
            },
        });

        return manifest;
    }

    async findByTipo(tipo: string) {
        const manifestacoes = await prisma.manifestacao.findMany({
            where: {
                tipo,
            },
        });

        return manifestacoes;
    }

    async findByUsuarioId(usuarioId: number) {
        const manifestacoes = await prisma.manifestacao.findMany({
            where: {
                usuarioId,
            },
        });

        return manifestacoes;
    }

    async findByInstituicaoId(instituicaoId: number) {
        const manifestacoes = await prisma.manifestacao.findMany({
            where: {
                instituicaoId,
            },
        });

        return manifestacoes;
    }

    async findById(id: number) {
        const manifestacao = await prisma.manifestacao.findUnique({
            where: {
                id,
            },
        });

        return manifestacao;
    }

    async findAll() {
        const manifestacoes = await prisma.manifestacao.findMany();
        return manifestacoes;
    }

    async delete(id: number) {
        await prisma.manifestacao.delete({
            where: {
                id,
            },
        });
    }
}