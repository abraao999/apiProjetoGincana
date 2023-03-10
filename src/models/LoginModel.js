const mongoose = require('mongoose');
const validator = require('validator')
const bcryptjs = require("bcryptjs")

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  senha: { type: String, required: true },
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body
    this.errors = []
    this.user = null
  }
  async login() {
    await this.valida()
    if (this.errors.length > 0)
      return

    this.user = await LoginModel.findOne({ email: this.body.email })
    if (!this.user) {
      this.errors.push("Usuario ou senha invalidos")
      return
    }
    if (!bcryptjs.compareSync(this.body.senha, this.user.senha)) {
      this.errors.push("Senha invalida")
      this.user = null
      return
    }
    return this.user
  }
  async register() {
    await this.valida()
    if (this.errors.length > 0)
      return

    await this.userExists()

    if (this.errors.length > 0)
      return

    const salt = bcryptjs.genSaltSync()
    this.body.senha = bcryptjs.hashSync(this.body.senha, salt)
    this.user = await LoginModel.create(this.body)
    console.log("user", this.user)
    return this.user

  }
  async userExists() {
    const user = await LoginModel.findOne({ email: this.body.email })
    if (user)
      this.errors.push('Usuario já existe')
  }

  async valida() {
    this.clearUp()
    if (!validator.isEmail(this.body.email))
      this.errors.push("E-mail invalido")

    if (this.body.senha.length < 3 || this.body.senha.length > 50)
      this.errors.push("A senha precisa ter entre 3 e 50 caracteres")
  }
  clearUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string')
        this.body[key] = ''
    }
    this.body = {
      email: this.body.email,
      senha: this.body.senha
    }
  }
  async index(){
    const dados = await LoginModel.find()
    return dados
  }
}

module.exports = Login;
