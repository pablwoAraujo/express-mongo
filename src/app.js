import express from "express";

const app = express();
app.use(express.json());

const livros = [
  {
    id: 1,
    title: "O Senhor dos Anéis",
  },
  {
    id: 2,
    title: "O Hobbit",
  },
];

function buscaLivro(id) {
  return livros.findIndex((livro) => livro.id === Number(id));
}

app.get("/", (req, res) => {
  res
    .status(200)
    .send("Curso de Node.js: criando uma API Rest com Express e MongoDB");
});

app.get("/livros", (req, res) => {
  res.status(200).json(livros);
});

app.get("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  console.log(index);
  res.status(200).json(livros[index]);
});

app.post("/livros", (req, res) => {
  livros.push(req.body);
  res.status(201).send("Livro cadastrado com sucesso");
});

app.put("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  livros[index].title = req.body.title;
  res.status(201).json(livros);
});

app.delete("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  if (index >= 0) {
    livros.splice(index, 1);
    res.status(200).send("Livro removido com sucesso.");
  } else {
    res.status(200).send("Livro não encontrado.");
  }
});

export default app;
