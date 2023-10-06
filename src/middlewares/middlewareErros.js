import mongoose from "mongoose";
import BaseError from "../error/BaseError.js";
import NotFoundError from "../error/NotFoundError.js";
import BadRequestError from "../error/BadRequestError.js";
import ValidationError from "../error/ValidationError.js";

// eslint-disable-next-line no-unused-vars
function middlewareErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.ValidationError) {
    new ValidationError(erro).respond(res);
  } else if (erro instanceof mongoose.Error.CastError) {
    new BadRequestError().respond(res);
  } else if (erro instanceof NotFoundError ) {
    erro.respond(res);
  } else {
    new BaseError().respond(res);
  }
}

export default middlewareErros;
