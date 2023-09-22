import NotFoundError from "../error/notFoundError.js";
import livros from "../models/Livros.js";

class LivroController {
  static async listarLivros(req, res) {
    try {
      const listaLivros = await livros.find({});
      res.status(200).json(listaLivros);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição` });
    }
  }

  static async listarLivroPorId(req, res) {
    try {
      const id = req.params.id;
      const livro = await livros.findById(id);

      if (livro === null) {
        throw new NotFoundError("Livro não encontrado na base de dados");
      }
      res.status(200).json(livro);
    } catch (erro) {
      if (erro instanceof NotFoundError) {
        res.status(404).json({ message: `${erro.message}` });
      } else {
        res
          .status(500)
          .json({ message: `${erro.message} - falha na requisição do livro` });
      }
    }
  }

  static async cadastrarLivro(req, res) {
    try {
      const novoLivro = await livros.create(req.body);
      res.status(201).json({ message: "criado com sucesso", livro: novoLivro });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha ao cadastrar livro` });
    }
  }

  static async atualizarLivro(req, res) {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, req.body);
      const livroAtualizado = await livros.findById(id);

      if (livroAtualizado === null) {
        throw new NotFoundError("Livro não encontrado na base de dados");
      }
      res.status(200).json({ message: "livro atualizado", livroAtualizado });
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

  static async excluirLivro(req, res) {
    try {
      const id = req.params.id;
      const livro = await livros.findByIdAndDelete(id);

      if (livro === null) {
        throw new NotFoundError("Livro não encontrado na base de dados");
      }
      res.status(200).json({ message: "livro excluído com sucesso" });
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

export default LivroController;
