import mongoose from "mongoose"
import { autoresSchema } from "./Autores.js";

// formato embedding
const livrosSchema = new mongoose.Schema ({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: true },
    editora: { type: String },
    preco: { type: Number },
    paginas: { type: Number },
    autor: autoresSchema
}, { versionKey: false });

// formato referencing
// const livroSchema = new mongoose.Schema({
//     id: { type: mongoose.Schema.Types.ObjectId },
//     titulo: { type: String, required: true },
//     editora: { type: String },
//     preco: { type: Number },
//     paginas: { type: Number },
//     autor: {type: mongoose.Schema.Types.ObjectId, ref: 'autores', required: true},
//    }, { versionKey: false });


const livros = mongoose.model("livros", livrosSchema);

export default livros;
