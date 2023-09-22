import express from "express";
import LivroController from "../controllers/livrosController.js";

const livrosRoutes = express.Router();

livrosRoutes.get("/livros", LivroController.listarLivros);
livrosRoutes.get("/livros/:id", LivroController.listarLivroPorId);
livrosRoutes.post("/livros", LivroController.cadastrarLivro);
livrosRoutes.put("/livros/:id", LivroController.atualizarLivro);

export default livrosRoutes;
