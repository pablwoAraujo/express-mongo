import BadRequestError from "../error/BadRequestError.js";

async function paginar(req, res, next) {
  try {
    let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;

    let [campoOrdenacao, ordem] = ordenacao.split(":");

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = req.resultado;
    const totalElements = req.countDocuments;

    if (limite > 0 && pagina > 0) {
      const resultadoPaginado = await resultado
        .find()
        .sort({ [campoOrdenacao]: ordem })
        .skip((pagina - 1) * limite)
        .limit(limite)
        .exec();

      const page = {
        content: resultadoPaginado,
        pageable: {
          campoOrdenacao,
          ordem,
          pagina,
          limite,
        },
        totalElements,
      };
      res.status(200).json(page);
    } else {
      next(new BadRequestError());
    }
  } catch (erro) {
    next(erro);
  }
}

export default paginar;
