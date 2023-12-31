import NotFoundError from "../error/NotFoundError.js";
import { autores } from "../models/index.js";
import livros from "../models/Livros.js";

class AutoresController {
  static async listarAutores(req, res, next) {
    try {
      const listaAutores = autores.find({});
      const countDocuments = await autores.countDocuments();

      req.resultado = listaAutores;
      req.countDocuments = countDocuments;
      next();
    } catch (erro) {
      next(erro);
    }
  }

  static async listarAutorPorId(req, res, next) {
    try {
      const id = req.params.id;
      const autor = await autores.findById(id);

      if (autor !== null) {
        res.status(200).json(autor);
      } else {
        next(new NotFoundError("Autor não encontrado na base de dados"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await autores.create(req.body);
      res.status(201).json({ message: "criado com sucesso", autor: novoAutor });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarAutor(req, res, next) {
    const atualizaAutorNosLivros = async (id, nacionalidade) => {
      if (nacionalidade !== null) {
        await livros.updateMany(
          { "autor._id": id },

          {
            $set: { "autor.nacionalidade": nacionalidade },
          }
        );
      }
    };

    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, req.body);
      const autorAtualizado = await autores.findById(id);

      if (autorAtualizado !== null) {
        await atualizaAutorNosLivros(id, req.body.nacionalidade);
        res.status(200).json({ message: "Autor atualizado", autorAtualizado });
      } else {
        next(new NotFoundError("Autor não encontrado na base de dados"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async excluirAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autor = await autores.findByIdAndDelete(id);

      if (autor !== null) {
        res.status(200).json({ message: "autor excluído com sucesso" });
      } else {
        next(new NotFoundError("Autor não encontrado na base de dados"));
      }
    } catch (erro) {
      next(erro);
    }
  }
}

export default AutoresController;
