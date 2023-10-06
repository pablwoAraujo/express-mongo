import NotFoundError from "../error/notFoundError.js";
import { autores } from "../models/Autores.js";
import livros from "../models/Livros.js";

class LivroController {
  // formato embedding
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
  // formato referencing
  // static async listarLivros (req, res) {
  //   try {
  //     const listaLivros = await livros.find({}).populate("autor").exec();
  //     res.status(200).json(listaLivros);
  //   } catch (erro) {
  //     res.status(500).json({ message: `${erro.message} - falha na requisição` });
  //   }
  // };

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

  static async buscarLivrosPorEditora(req, res) {
    const editora = req.query.editora;

    try {
      const livrosPorEditora = await livros.find({ editora });
      res.status(200).json(livrosPorEditora);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na busca` });
    }
  }

  static async cadastrarLivro(req, res) {
    const novoLivro = req.body;

    try {
      const autorEncontrado = await autores.findById(novoLivro.autor);

      if (autorEncontrado === null) {
        throw new NotFoundError("Autor não encontrado.");
      }

      const livroCompleto = {
        ...novoLivro,
        autor: { ...autorEncontrado._doc },
      };

      const livroCriado = await livros.create(livroCompleto);

      res
        .status(201)
        .json({ message: "criado com sucesso", livro: livroCriado });
    } catch (erro) {
      if (erro instanceof NotFoundError) {
        res.status(404).json(erro.message);
      } else {
        res
          .status(500)
          .json({ message: `${erro.message} - falha ao cadastrar livro` });
      }
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
