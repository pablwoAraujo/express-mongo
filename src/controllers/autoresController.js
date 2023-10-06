import NotFoundError from "../error/notFoundError.js";
import { autores } from "../models/Autores.js";
import livros from "../models/Livros.js";

class AutoresController {
  static async listarAutores(req, res) {
    try {
      const listaAutores = await autores.find({});
      res.status(200).json(listaAutores);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição` });
    }
  }

  static async listarAutorPorId(req, res) {
    try {
      const id = req.params.id;
      const autor = await autores.findById(id);

      if (autor === null) {
        throw new NotFoundError("Autor não encontrado na base de dados");
      }
      res.status(200).json(autor);
    } catch (erro) {
      if (erro instanceof NotFoundError) {
        res.status(404).json({ message: `${erro.message}` });
      } else {
        res
          .status(500)
          .json({ message: `${erro.message} - falha na requisição do autor ` });
      }
    }
  }

  static async cadastrarAutor(req, res) {
    try {
      const novoAutor = await autores.create(req.body);
      res.status(201).json({ message: "criado com sucesso", autor: novoAutor });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha ao cadastrar autor ` });
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

  static async atualizarAutor(req, res) {
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
      if (erro instanceof NotFoundError) {
        res.status(404).json({ message: `${erro.message}` });
      } else {
        res
          .status(500)
          .json({ message: `${erro.message} - falha na atualização` });
      }
    }
  }

 

  static async excluirAutor(req, res) {
    try {
      const id = req.params.id;
      const autor = await autores.findByIdAndDelete(id);

      if (autor === null) {
        throw new NotFoundError("Autor não encontrado na base de dados");
      }
      res.status(200).json({ message: "autor excluído com sucesso" });
    } catch (erro) {
      if (erro instanceof NotFoundError) {
        res.status(404).json({ message: `${erro.message}` });
      } else {
        res
          .status(500)
          .json({ message: `${erro.message} - falha na exclusão` });
      }
    }
  }
}

export default AutoresController;
