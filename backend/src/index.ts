import express from "express";
import cors from "cors";
import { usuarioRouter } from "./router/usuarioRouter";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/usuarios", usuarioRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});