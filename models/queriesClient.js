const Client = require('./Client');

const findName = async (name) => {
  const checkName = await Client.findOne({name: name});

  return checkName;
}

const findCpf = async (cpf) => {
  const checkCpf = await Client.findOne({cpf: cpf});

  return checkCpf;
}

module.exports = {
  findName,
  findCpf
}