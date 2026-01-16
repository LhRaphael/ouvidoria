import { Router } from "express";
import { UsuarioController } from "../controller/usuarioController";

const usuarioRouter = Router();
const usuarioController = new UsuarioController();

usuarioRouter.get("/:id", async (req, res) => {
    return res.json(await usuarioController.getById(req.params.id));
});

usuarioRouter.get("/email/:email", async (req, res) => {
    return res.json(await usuarioController.getByEmail(req.params.email));
});

usuarioRouter.post("/", async (req, res) => {
    return res.json(await usuarioController.create(req.body));
});

usuarioRouter.post("/verify", async (req, res) => {
    const { email, password } = req.body;
    return res.json(await usuarioController.verifyCredentials(email, password));
});

export { usuarioRouter };