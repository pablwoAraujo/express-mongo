import mongoose from "mongoose";
import { autoresSchema } from "./Autores.js";

// formato embedding
const livrosSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
      type: String,
      required: [true, "O título do livro é obrigatório"],
    },
    editora: { type: String },
    preco: { type: Number },
    paginas: { type: Number },
    autor: autoresSchema,
  },
  { versionKey: false }
);

// formato referencing
// const livrosSchema = new mongoose.Schema({
//   id: { type: mongoose.Schema.Types.ObjectId },
//   titulo: {
//     type: String,
//     required: [true, "O título do livro é obrigatório"],
//   },  
//   editora: { type: String },
//   preco: { type: Number },
//   paginas: { type: Number },
//   autor: {type: mongoose.Schema.Types.ObjectId, ref: "autores", required: [true, "Autor(a) é obrigatório."]},
// }, { versionKey: false });

const livros = mongoose.model("livros", livrosSchema);

export default livros;
