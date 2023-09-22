import NotFoundError from "../error/notFoundError.js";
import livros from "../models/Livros.js";

class LivroController {
  static async listarLivros(req, res) {
    const listaLivros = await livros.find({});
    res.status(200).json(listaLivros);
  }

  static async listarLivroPorId(req, res) {
    try {
      const id = req.params.id;
      const livro = await livros.findById(id).exec();

      if (livro === null){
        throw new NotFoundError("Livro não encontrado na base de dados");
      }
      res.status(200).json(livro);
    } catch (erro) {
      if (erro instanceof NotFoundError) {
        res
        .status(404)
        .json({ message: `${erro.message}` });
      }
      else{
        res
          .status(500)
          .json({ message: `${erro.message} - falha na requisição do livro` });
      }
    }
  }
}

export default LivroController;
