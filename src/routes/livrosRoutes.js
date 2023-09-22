import express from "express";
import LivroController from "../controllers/livrosController.js";

const livrosRoutes = express.Router();

livrosRoutes.get("/livros", LivroController.listarLivros);
livrosRoutes.get("/livros/:id", LivroController.listarLivroPorId);

export default livrosRoutes;
