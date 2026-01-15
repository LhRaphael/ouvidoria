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

    async findByCnpj(cnpj: string) {
        const manifestacoes = await prisma.manifestacao.findMany({
            where: {
                instituicao: {
                    cnpj,
                },
            },
        });

        return manifestacoes;
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

    async findByIdSimple(id: number) {
        const manifestacao = await prisma.manifestacao.findUnique({
            where: {
                id,
            }
        });

        const usuario = manifestacao?.anonimo ? null : await prisma.usuario.findUnique({
            where: {
                id: manifestacao?.usuarioId,
            },
            select: {
                nome: true,
            },
        });

        const instituicao = await prisma.instituicao.findUnique({
            where: {
                id: manifestacao?.instituicaoId,
            },
            select: {
                nome: true,
            },
        });

        const data = {
            id: manifestacao?.id,
            tipo: manifestacao?.tipo,
            conteudo: manifestacao?.conteudo,
            data: manifestacao?.criado,
            anonimo: manifestacao?.anonimo,
            usuario: usuario?.nome || "Anônimo",
            instituicao: instituicao?.nome || "Instituição não encontrada",
        }

        return data;
    }

    async findAll() {
        const manifestacoes = await prisma.manifestacao.findMany();
        return manifestacoes;
    }

    async update(data:{id:number, status: string}){

        const manifestacao = prisma.manifestacao.update({
            where:{
                id: data.id,
            },
            data:{
                status: data.status
            }
        })
        return manifestacao
    }

    async delete(id: number) {
        const manifestacao = await prisma.manifestacao.delete({
            where: {
                id,
            },
        });
        return manifestacao
    }
}