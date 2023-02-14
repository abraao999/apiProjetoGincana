const mongoose = require("mongoose");

const PerguntaSchema = new mongoose.Schema({
  livroId: { type: String, required: true },
  pergunta: { type: String, required: true },
  alternativa: { type: Boolean, required: true },
  resposta: { type: String, required: true },
  alternativa2: String,
  alternativa3: String,
  alternativa4: String,
});

const PerguntaModel = mongoose.model("Pergunta", PerguntaSchema);

class Pergunta {
  constructor(body) {
    this.body = body;
    this.errors = [];
  }

  async index() {
    const response = await PerguntaModel.find();
    return response;
  }
  async create() {
    this.valida();
    if (this.errors.length > 0) return this.errors;
    const response = await PerguntaModel.create(this.body);
    return response;
  }
  async valida() {
    this.clearUp();
    if (
      typeof this.body.livroId !== "string" ||
      typeof this.body.pergunta !== "string" ||
      typeof this.body.resposta !== "string" ||
      typeof this.body.alternativa !== "boolean" ||
      typeof this.body.alternativa2 !== "string" ||
      typeof this.body.alternativa3 !== "string" ||
      typeof this.body.alternativa4 !== "string"
    )
      this.errors.push("Dado inválido");
  }
  clearUp() {
    this.body = {
      livroId: this.body.livroId,
      pergunta: this.body.pergunta,
      alternativa: this.body.alternativa,
      resposta: this.body.resposta,
      alternativa2: this.body.alternativa2,
      alternativa3: this.body.alternativa3,
      alternativa4: this.body.alternativa4,
    };
  }
}

module.exports = Pergunta;
