const bcrypt = require('bcryptjs');
const Client = require('../models/Client');
const queriesClient = require('../models/queriesClient');
const validCpf = require('./validCpf');

const validateRegister = (req, res, next) => {
  const { name, cpf, password } = req.body;
  const typeName = typeof name ==  typeof 'string';
  const typeCpf = typeof cpf ==  typeof 'string';
  const typePassword = typeof password ==  typeof 'string';
  const validPassword = password.length < 6 || password.length > 200;
  
  if ( !typeName || !name || name.length < 3 || name.length > 50) {
    return res.status(400).send('Nome não esta de acordo com os padrões solicitados.'); 
  }

  if (!queriesClient.findName(name)) {
    return res.status(400).send('Nome já cadastrado.');
  }

  if (!typeCpf || !cpf || !validCpf(cpf)) {
    return res.status(400).send('CPF não é válido.');
  }

  if (!queriesClient.findCpf(cpf)) {
    return res.status(400).send('CPF já cadastrado.');
  }

  if (!typePassword || !password || validPassword) {
    return res.status(400).send('Digite uma senha de acordo com os padrões solicitados.');
  }

  next();
}

const responseRegister = async (req, res) => {
  const { name, cpf, password } = req.body;
  const salt = bcrypt.genSaltSync(14);
  const bcryptPassword = bcrypt.hashSync(password, salt); 

  const client = new Client({
    name: name,
    cpf: cpf,
    password: bcryptPassword 
  });

  try {
    const saveClient = await client.save();

    return res.status(200).send('Registro realizado com sucesso.');
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = {
  validateRegister,
  responseRegister
}