const validarEmail = require('../../aluno/utils/validarEmail');

const validarDadosProfessor = (dados) => {
  const { full_name, email, senha, data_nascimento } = dados;

  if (!full_name || !email || !senha || !data_nascimento) {
    throw { status: 400, message: 'Campos obrigatórios faltando: nome, email, senha e data de nascimento.' };
  }

  if (!validarEmail(email)) {
    throw { status: 400, message: 'Email inválido.' };
  }
};

module.exports = { validarDadosProfessor };