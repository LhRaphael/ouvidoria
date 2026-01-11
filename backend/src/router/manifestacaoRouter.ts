import { Router } from 'express';
import { ManifestacaoController } from '../controller/manifestacaoController';

const manifestacaoRouter = Router();
const manifestacaoController = new ManifestacaoController();

manifestacaoRouter.get('/:id', async (req, res) => {
    return res.json(await manifestacaoController.getById(Number(req.params.id)));
});

manifestacaoRouter.get('/usuario/:id', async (req, res) => {
    return res.json(await manifestacaoController.getByUsuarioId(Number(req.params.id)));
});

manifestacaoRouter.get('/admin/:id', async (req, res) => {
    return res.json(await manifestacaoController.getByInstituicaoId(Number(req.params.id)));
});

manifestacaoRouter.get('/tipo/:tipo', async (req, res) => {
    return res.json(await manifestacaoController.getByTipo(req.params.tipo));
});

manifestacaoRouter.post('/', async (req, res) => {
    return res.json(await manifestacaoController.create(req.body));
});

export { manifestacaoRouter };