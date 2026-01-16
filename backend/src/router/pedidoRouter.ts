import { Router } from "express";
import { PedidoController } from "../controller/pedidoController";

const pedidoRouter = Router();
const pedidoController = new PedidoController();

pedidoRouter.get("/:id", async (req, res) => {
  return res.json(await pedidoController.getById(Number(req.params.id)));
});

pedidoRouter.post("/", async (req, res) => {
  return res.json(await pedidoController.create(req.body));
});

pedidoRouter.get("/", async (req, res) => {
  return res.json(await pedidoController.getAll());
});
pedidoRouter.get("/cpf/:cpf", async (req, res) => {
  return res.json(await pedidoController.getByCpf(req.params.cpf));
});

pedidoRouter.get("/cnpj/:cnpj", async (req, res) => {
  return res.json(await pedidoController.getByCnpj(req.params.cnpj));
});

pedidoRouter.get("/simples/cnpj/:cnpj", async (req, res) =>{
  return res.json(await pedidoController.getSimpleByCnpj(req.params.cnpj))
})
pedidoRouter.delete("/:cpf", async (req, res) => {
  await pedidoController.delete(req.params.cpf);
  return res.status(204).send();
});

export { pedidoRouter };