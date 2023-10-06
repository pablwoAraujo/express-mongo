import NotFoundError from "../error/notFoundError.js";
import { autores } from "../models/Autores.js";
import livros from "../models/Livros.js";

class AutoresController {
  static async listarAutores(req, res, next) {
    try {
      const listaAutores = await autores.find({});
      res.status(200).json(listaAutores);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarAutorPorId(req, res, next) {
    try {
      const id = req.params.id;
      const autor = await autores.findById(id);

      if (autor === null) {
        throw new NotFoundError("Autor não encontrado na base de dados");
      }
      res.status(200).json(autor);
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

  atualizaAutorNosLivros = async (id, nacionalidade) => {
    if (nacionalidade !== null) {
      await livros.updateMany(
        { "autor._id": id },

        {
          $set: { "autor.nacionalidade": nacionalidade },
        }
      );
    }
  };

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

      if (autorAtualizado === null) {
        throw new NotFoundError("Autor não encontrado na base de dados");
      }

      await atualizaAutorNosLivros(id, req.body.nacionalidade);

      res.status(200).json({ message: "Autor atualizado", autorAtualizado });
    } catch (erro) {
      next(erro);
    }
  }

  static async excluirAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autor = await autores.findByIdAndDelete(id);

      if (autor === null) {
        throw new NotFoundError("Autor não encontrado na base de dados");
      }
      res.status(200).json({ message: "autor excluído com sucesso" });
    } catch (erro) {
      next(erro);
    }
  }
}

export default AutoresController;
