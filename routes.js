const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const contatoController = require("./src/controllers/contatoController");
const { loginRequired } = require("./src/middlewares/middleware");
const livroController = require("./src/controllers/livroController");
const perguntaController = require("./src/controllers/perguntaController");

// Rotas da home
route.get("/", homeController.index);

route.get("/login", loginController.index);
route.post("/login/register", loginController.register);
route.post("/login/login", loginController.login);
route.get("/login/logout", loginController.logout);

route.get("/contato", loginRequired, contatoController.index);
route.post("/contato/register", loginRequired, contatoController.register);
route.post("/contato/edit/:id", loginRequired, contatoController.edit);
route.get("/contato/delete/:id", loginRequired, contatoController.delete);
route.get("/contato/:id", loginRequired, contatoController.editIndex);

route.post("/livro", livroController.create);
route.get("/livro", livroController.index);
route.get("/livro/show/:id", livroController.show);

//perguntas
route.post("/pergunta", perguntaController.create);
route.get("/pergunta", perguntaController.index);

module.exports = route;
