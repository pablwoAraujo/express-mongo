import NotFoundError from "../error/NotFoundError.js";

function middleware404(req, res, next) {
  next(new NotFoundError());
}

export default middleware404;
