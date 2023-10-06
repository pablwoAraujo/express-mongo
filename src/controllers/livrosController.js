import NotFoundError from "../error/NotFoundError.js";
import { autores } from "../models/Autores.js";
import livros from "../models/Livros.js";

class LivroController {
  // formato embedding
  static async listarLivros(req, res, next) {
    try {
      const listaLivros = await livros.find({});
      res.status(200).json(listaLivros);
    } catch (erro) {
      next(erro);
    }
  }
  // formato referencing
  // static async listarLivros (req, res) {
  //   try {
  //     const listaLivros = await livros.find({}).populate("autor").exec();
  //     res.status(200).json(listaLivros);
  //   } catch (erro) {
  //     res.status(500).json({ message: `${erro.message} - falha na requisição` });
  //   }
  // };

  static async listarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livro = await livros.findById(id);

      if (livro !== null) {
        res.status(200).json(livro);
      } else {
        next(new NotFoundError("Livro não encontrado na base de dados"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async buscarLivrosPorEditora(req, res, next) {
    const editora = req.query.editora;

    try {
      const livrosPorEditora = await livros.find({ editora });
      res.status(200).json(livrosPorEditora);
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;

    try {
      const autorEncontrado = await autores.findById(novoLivro.autor);

      if (autorEncontrado !== null) {
        const livroCompleto = {
          ...novoLivro,
          autor: { ...autorEncontrado._doc },
        };

        const livroCriado = await livros.create(livroCompleto);

        res.status(201).json({
          message: "Livro cadastrado com sucesso.", 
          livro: livroCriado
        });
      } else {
        next(new NotFoundError("Autor não encontrado na base de dados"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, req.body);
      const livroAtualizado = await livros.findById(id);

      if (livroAtualizado !== null) {
        res.status(200).json({ message: "livro atualizado", livroAtualizado });
      } else {
        next(new NotFoundError("Livro não encontrado na base de dados"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async excluirLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livro = await livros.findByIdAndDelete(id);

      if (livro !== null) {
        res.status(200).json({ message: "livro removido com sucesso" });
      } else {
        next(new NotFoundError("Livro não encontrado na base de dados"));
      }
    } catch (erro) {
      next(erro);
    }
  }
}

export default LivroController;
