import express from "express";

const app = express();

app.get("/", (req, res) => {
  res
    .status(200)
    .send("Curso de Node.js: criando uma API Rest com Express e MongoDB");
});

export default app;
