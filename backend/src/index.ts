import express from "express";

const app = express();
const PORT = 3000;

// middleware para JSON
app.use(express.json());

// rota simples
app.get("/", (req, res) => {
  res.send("Servidor Express funcionando 🚀");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});