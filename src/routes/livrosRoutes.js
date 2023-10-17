import express from "express";
import LivroController from "../controllers/livrosController.js";
import paginar from "../middlewares/paginar.js";

const livrosRoutes = express.Router();

livrosRoutes.get("/livros", LivroController.listarLivros, paginar);
livrosRoutes.get("/livros/busca", LivroController.buscarLivros, paginar);
livrosRoutes.get("/livros/:id", LivroController.listarLivroPorId);
livrosRoutes.post("/livros", LivroController.cadastrarLivro);
livrosRoutes.put("/livros/:id", LivroController.atualizarLivro);
livrosRoutes.delete("/livros/:id", LivroController.excluirLivro);

export default livrosRoutes;
