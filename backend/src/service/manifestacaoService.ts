import { prisma } from "../lib/prisma";

export class ManifestacaoService {
    async create(data: {
        tipo: string;
        descricao: string;
        arquivo?: string;
        usuarioId: number;
        instituicaoId: number;
    }) {
        const manifest  = await prisma.manifestacao.create({
            data: {
                usuarioId: data.usuarioId,
                tipo: data.tipo,
                conteudo: data.descricao,
                instituicaoId: data.instituicaoId,
            },
        });

        return manifest;
    }
}