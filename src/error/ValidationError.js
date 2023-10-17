import BadRequestError from "./BadRequestError.js";

class ValidationError extends BadRequestError {
  constructor(erro) {
    const errorMessage = Object.values(erro.errors)
      .map((erro) => erro.message)
      .join("; ");

    super(`Erro de validação de dados: ${errorMessage}`);
  }
}

export default ValidationError;
