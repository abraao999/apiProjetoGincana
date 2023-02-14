const mongoose = require("mongoose");

const LivroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
});

const LivroModel = mongoose.model("Livro", LivroSchema);

class Livro {
  constructor(body) {
    this.body = body;
    this.errors = [];
  }
  async index() {
    const response = await LivroModel.find();
    return response;
  }
  async show(id) {
    const response = await LivroModel.findOne({ _id: id });
    return response;
  }
  async create() {
    await this.valida();
    if (this.errors.length > 0) return this.errors;

    const response = await LivroModel.create(this.body);
    return response;
  }
  async valida() {
    this.clearUp();
    if (typeof this.body.titulo !== "string")
      this.errors.push("Título invalido");
  }
  clearUp() {
    this.body = {
      titulo: this.body.titulo,
    };
  }
}

module.exports = Livro;
