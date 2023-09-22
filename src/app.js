import express from "express";
import dbConnect from "./config/dbConnect.js";
import livros from "./models/Livros.js";

const conexao = await dbConnect();

conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
  res
    .status(200)
    .send("Curso de Node.js: criando uma API Rest com Express e MongoDB");
});

app.get("/livros", async (req, res) => {
  const listaLivros = await livros.find();
  res.status(200).json(listaLivros);
});

app.get("/livros/:id", async (req, res) => {
  const livro = await livros.findById(req.params.id);
  res.status(200).json(livro);
});

export default app;