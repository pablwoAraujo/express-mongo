import express from "express";
import AutoresController from "../controllers/autoresController.js";
import paginar from "../middlewares/paginar.js";

const autoresRoutes = express.Router();

autoresRoutes.get("/autores", AutoresController.listarAutores, paginar);
autoresRoutes.get("/autores/:id", AutoresController.listarAutorPorId);
autoresRoutes.post("/autores", AutoresController.cadastrarAutor);
autoresRoutes.put("/autores/:id", AutoresController.atualizarAutor);
autoresRoutes.delete("/autores/:id", AutoresController.excluirAutor);

export default autoresRoutes;
