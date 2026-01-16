import express from "express";
import cors from "cors";
import { usuarioRouter } from "./router/usuarioRouter";
import { loginRouter } from "./router/loginRouter";
import { instituicaoRouter } from "./router/instituicaoRouter";
import { adminRouter } from "./router/adminRouter";
import { manifestacaoRouter } from "./router/manifestacaoRouter";
import { iaRouter } from "./router/iaRouter";
import { pedidoRouter } from "./router/pedidoRouter";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/usuarios", usuarioRouter);
app.use("/login", loginRouter);
app.use("/instituicoes", instituicaoRouter);
app.use("/admins", adminRouter);
app.use("/manifestacoes", manifestacaoRouter);  
app.use("/ia", iaRouter);
app.use("/pedidos", pedidoRouter);

//TODO: fazer o roteamento das outras entidades (Manifestação e admin)
// Criar uma classe de errors personalizados para tratar os erros de forma mais eficiente

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});