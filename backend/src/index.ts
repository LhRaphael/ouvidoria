import express from "express";
import cors from "cors";
import { usuarioRouter } from "./router/usuarioRouter";
import { loginRouter } from "./router/loginRouter";
import { instituicaoRouter } from "./router/instituicaoRouter";
import { adminRouter } from "./router/adminRouter";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/usuarios", usuarioRouter);
app.use("/login", loginRouter);
app.use("/instituicoes", instituicaoRouter);
app.use("/admins", adminRouter);

//TODO: fazer o roteamento das outras entidades (Manifestação e admin)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});