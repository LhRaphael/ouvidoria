import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "../lib/prisma";
import dotenv from "dotenv";

dotenv.config();

const aiClient = new GoogleGenerativeAI(process.env["API_KEY"]!);
const model = aiClient.getGenerativeModel({ model: "gemini-3-flash-preview" })

export class IAService {

    async gerarTexto(prompt: string): Promise<string> {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    }

    async salvarRelatorio(texto:string, instituicaoId:number){
        const relatorio = await prisma.resumo.create({
            data:{
                conteudo:texto,
                criacao: new Date(),
                instituicaoId: instituicaoId
            }
        });
        return relatorio;
    }

    async getRelatoriosByInstituicao(instituicaoId:number){
        const relatorios = await prisma.resumo.findMany({
            where:{
                instituicaoId: instituicaoId
            }
        });
        return relatorios;
    }   

}