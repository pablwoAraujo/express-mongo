import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function middlewareErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    res
      .status(404)
      .send({ message: "Um ou mais dados fornecidos estão incorretos." });
  } else {
    res.status(500).send({ message: "Erro interno do servidor." });
  }
}

export default middlewareErros;
