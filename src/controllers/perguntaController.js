const { async } = require("regenerator-runtime");
const Pergunta = require("../models/PerguntaModel")

exports.index = async (req, res) => {
  const dado = new Pergunta(req.body)
  const response = await dado.index()
  return res.send(response)
};
exports.create = async (req, res) => {
  const dado = new Pergunta(req.body)
  
  try {

    const valor = await dado.create()

    console.log(valor);
    return res.send(valor);
  } catch (error) {
    res.send(dado.errors)
    console.log(error)
  }
  
}

