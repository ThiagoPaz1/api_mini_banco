const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const queriesClient = require('../models/queriesClient');

const validLogin = async (req, res, next) => {
  const { name, password } = req.headers;
  const findLogin = await queriesClient.findName(name);
  const validPassword = bcrypt.compareSync(password, findLogin.password);
  
  if (findLogin.name != name) {
    return res.status(401).send('Nome ou senha invalidos');
  }

  if (!validLogin) {
    return res.status(401).send('Nome ou senha invalidos');
  }

  next();
}

const generateToken = (req, _res, next) => {
  const { name } = req.headers;
  const secret = process.env.SECRET;
  const token = jwt.sign({user: name}, secret);

  req.token = token;

  next()
}

const responseLogin = (req, res) => {
  try {
    res.header('authorization-token', req.token);
    return res.status(200).send('Login efetuado com sucesso!');
  } catch (error){
    return res.send(error);
  }
}

module.exports = {
  validLogin,
  generateToken,
  responseLogin
}