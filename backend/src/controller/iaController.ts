import { IAService } from "../service/iaService";

export class IAController {
    private iaService: IAService = new IAService();
    
    async gerarTexto(prompt: string): Promise<string> {
        try {
            const textoGerado = await this.iaService.gerarTexto(prompt);
            return textoGerado;
        } catch (error) {
            throw new Error("Erro ao gerar texto: " + error);
        } 
    }

    async salvarRelatorio(texto:string, instituicaoId:number){
        try {
            const relatorio = await this.iaService.salvarRelatorio(texto, instituicaoId);
            return relatorio;
        } catch (error) {
            throw new Error("Erro ao salvar relatório: " + error);
        } 
    }

    async getRelatoriosByInstituicao(instituicaoId:number){
        try {
            const relatorios = await this.iaService.getRelatoriosByInstituicao(instituicaoId);
            return relatorios;
        } catch (error) {
            throw new Error("Erro ao obter relatórios: " + error);
        } 
    }
}