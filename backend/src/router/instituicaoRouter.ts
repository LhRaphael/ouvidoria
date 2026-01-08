import { Router } from 'express';
import { InstituicaoController } from '../controller/instituicaoController';

const instituicaoRouter = Router();
const instituicaoController = new InstituicaoController();

instituicaoRouter.get('/:id', async (req, res) => {
    return res.json(await instituicaoController.getById(req.params.id));
});

instituicaoRouter.get('/cnpj/:cnpj', async (req, res) => {
    return res.json(await instituicaoController.getByCnpj(req.params.cnpj));
});

instituicaoRouter.get('/', async (req, res) => {
    return res.json(await instituicaoController.getAll());
});

instituicaoRouter.post('/', async (req, res) => {
    return res.json(await instituicaoController.create(req.body));
});

export { instituicaoRouter };