const { async } = require("regenerator-runtime");
const Login = require("../models/LoginModel")

exports.index = (req, res) => {
  const login = new Login(req.body)
  return res.send(login.index())
};
exports.register = async (req, res) => {
  const login = new Login(req.body)
  console.log(login)
  try {

    const valor = await login.register()

    return res.send(valor);
  } catch (error) {
    res.send(login.errors)
    console.log(error)
  }
  
}

exports.logout = async (req, res) => {
  req.session.destroy()
  res.redirect('/')
}
exports.login = async (req, res) => {
  try {

    const login = new Login(req.body)
    const response = await login.login()


    if (login.errors.length > 0) {
      // req.flash("errors", login.errors)
      // req.session.save(() => { return res.redirect('back') })
      
      
      return res.send(login.errors)
    }
    return res.send(response)
  } catch (error) {
    return res.render('404')
    console.log(error)
  }


};

