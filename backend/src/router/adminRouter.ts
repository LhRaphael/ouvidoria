import { Router } from 'express';
import { AdminController } from '../controller/adminController';

const adminRouter = Router();
const adminController = new AdminController();

adminRouter.get('/:id', async (req, res) => {
  return res.json(await adminController.getAdminById(req.params.id));
});

adminRouter.post('/', async (req, res) => {
  return res.json(await adminController.createAdmin(req.body));
});

adminRouter.get('/email/:email', async (req, res) => {
  return res.json(await adminController.getAdminByEmail(req.params.email));
});

adminRouter.get('/', async (req, res) => {
  return res.json(await adminController.getAllAdmins());
});

export { adminRouter };