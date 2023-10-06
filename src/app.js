import express from "express";
import dbConnect from "./config/dbConnect.js";
import routes from "./routes/index.js";
import middlewareErros from "./middlewares/middlewareErros.js";

const conexao = await dbConnect();

conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();
routes(app);

app.use(middlewareErros);

export default app;
