const { async } = require("regenerator-runtime");
const Livro = require("../models/LivroModel");

exports.index = async (req, res) => {
  const livro = new Livro(req.body);
  const response = await livro.index();
  return res.send(response);
};
exports.show = async (req, res) => {
  const livro = new Livro(req.body);
  const response = await livro.show(req.id);
  console.log(response);
  return res.send(response);
};
exports.create = async (req, res) => {
  const livro = new Livro(req.body);
  try {
    const valor = await livro.create();
    console.log(valor);
    return res.send(valor);
  } catch (error) {
    res.send(livro.errors);
    console.log(error);
  }
};

exports.logout = async (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
exports.livro = async (req, res) => {
  try {
    const livro = new Livro(req.body);
    const response = await livro.livro();

    if (livro.errors.length > 0) {
      // req.flash("errors", livro.errors)
      // req.session.save(() => { return res.redirect('back') })

      return res.send(livro.errors);
    }
    return res.send(response);
  } catch (error) {
    return res.render("404");
    console.log(error);
  }
};
