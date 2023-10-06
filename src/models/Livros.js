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
    editora: {
      type: String,
      required: [true, "A editora é obrigatória"],
      enum: {
        values: ["Casa do Código", "Alura"],
        message: "A editora {VALUE} não esta cadastrada em nosso sistema",
      },
    },
    preco: { type: Number, validate:{
      validator: (value) => {
        return value>0;
      },
      message: "O preço precisa ser maior que R$ 0,00"
    }},
    paginas: {
      type: Number,
      min: [1, "O Número de páginas deve estar entre 1 e 5000"],
      max: [5000, "O Número de páginas deve estar entre 1 e 5000"],
    },
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
