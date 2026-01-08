import { InstituicaoService } from "../service/instituicaoService";

const instituicaoService = new InstituicaoService();

export class InstituicaoController {
    async create(data:{
        nome: string;
        cnpj: string;
        sede: string;
    }) {
        try{
            const instituicao = await instituicaoService.create(data);
            return instituicao;
        }
        catch(error){
            throw error;
        }   
    }

    async getById(id: String) {
        try{
            const instituicao = await instituicaoService.findById(Number(id));
            return instituicao;
        }
        catch(error){
            throw error;
        }   
    }

    async getByCnpj(cnpj: string) {
        try{
            const instituicao = await instituicaoService.findByCnpj(cnpj);
            return instituicao;
        }
        catch(error){
            throw error;
        }   
    }

    async getAll() {
        try{
            const instituicoes = await instituicaoService.findAll();
            return instituicoes;
        }
        catch(error){
            throw error;
        }   
    }
}

