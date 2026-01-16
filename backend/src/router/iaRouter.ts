import { IAController } from "../controller/iaController";
import { Router } from "express";

export const iaRouter = Router();
const iaController = new IAController();

iaRouter.post("/gerar", async (req, res) => {
    const { prompt } = req.body;
    return res.json(await iaController.gerarTexto(prompt));
});

iaRouter.post("/salvar",  async (req, res) => {
    const { texto, instituicaoId } = req.body;
    return res.json(await iaController.salvarRelatorio(texto, instituicaoId));
});

iaRouter.get("/relatorios/:instituicaoId", async (req, res) => {
    const instituicaoId = parseInt(req.params.instituicaoId);
    return res.json(await iaController.getRelatoriosByInstituicao(instituicaoId));
});