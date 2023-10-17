import NotFoundError from "../error/NotFoundError.js";
import { autores } from "../models/index.js";
import { livros } from "../models/index.js";

class LivroController {
  // formato embedding
  // static async listarLivros(req, res, next) {
  //   try {
  //     const listaLivros = await livros.find({});
  //     res.status(200).json(listaLivros);
  //   } catch (erro) {
  //     next(erro);
  //   }
  // }

  // formato referencing
  static async listarLivros(req, res, next) {
    try {
      const listaLivros = livros.find({});
      const countDocuments = await livros.countDocuments();

      req.resultado = listaLivros;
      req.countDocuments = countDocuments;
      next();
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livro = await livros.findById(id).populate("autor");

      if (livro !== null) {
        res.status(200).json(livro);
      } else {
        next(new NotFoundError("Livro não encontrado na base de dados"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async buscarLivros(req, res, next) {
    try {
      const busca = await processaBusca(req.query);

      if (busca) {
        const resultado = livros.find(busca).populate("autor");
        const countDocuments = await livros.countDocuments();

        req.resultado = resultado;
        req.countDocuments = countDocuments;

        next();
      } else {
        res.status(200).json([]);
      }
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
          livro: livroCriado,
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

async function processaBusca(params) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params;

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.paginas = {};
  if (minPaginas) busca.paginas.$gte = minPaginas;
  if (maxPaginas) busca.paginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({
      nome: { $regex: nomeAutor, $options: "i" },
    });

    if (autor) busca.autor = autor._id;
    else busca = null;
  }
  return busca;
}

export default LivroController;
