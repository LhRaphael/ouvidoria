import { ManifestacaoService } from "../service/manifestacaoService";

const manifestacaoService = new ManifestacaoService();

export class ManifestacaoController {
    async create(data: {
        tipo: string;
        descricao: string;
        arquivo?: string;
        anonimo?: boolean;
        usuarioId: number;
        instituicaoId: number;  
    }) {
        try{
            const manifestacao = await manifestacaoService.create(data);
            return manifestacao;
        }
        catch(error){
            throw error;
        }   
    }

    async findByIdSimple(id: number) {
        try{
            const manifestacao = await manifestacaoService.findByIdSimple(id);
            return manifestacao;
        }
        catch(error){
            throw error;
        }   
    }

    async findByCnpj(cnpj: string) {
        try{
            const manifestacoes = await manifestacaoService.findByCnpj(cnpj);
            return manifestacoes;
        }
        catch(error){
            throw error;
        }   
    }

    async getByTipo(tipo: string) {
        try{
            const manifestacoes = await manifestacaoService.findByTipo(tipo);
            return manifestacoes;
        }
        catch(error){
            throw error;
        }   
    }

    async getByUsuarioId(usuarioId: number) {
        try{
            const manifestacoes = await manifestacaoService.findByUsuarioId(usuarioId);
            return manifestacoes;
        }
        catch(error){
            throw error;
        }   
    }

    async getByInstituicaoId(instituicaoId: number) {
        try{
            console.log("Controller: ", instituicaoId);
            const manifestacoes = await manifestacaoService.findByInstituicaoId(instituicaoId);
            return manifestacoes;
        }
        catch(error){
            throw error;
        }   
    }

    async getById(id: number) {
        try{
            const manifestacao = await manifestacaoService.findById(id);
            return manifestacao;
        }
        catch(error){
            throw error;
        }   
    }       
}

