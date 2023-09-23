import mongoose from "mongoose";

const autoresSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, required: true },
    nacionalidade: { type: String },
  },
  { versionKey: false }
);

const autores = mongoose.model("autores", autoresSchema);

export { autores, autoresSchema };
