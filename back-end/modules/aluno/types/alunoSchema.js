const validarEmail = require('../utils/validarEmail');

const validarDadosAluno = (dados) => {
  const { full_name, email, senha, data_nascimento, turma_id } = dados;

  if (!full_name || !email || !senha || !data_nascimento || !turma_id) {
    throw { status: 400, message: 'Campos obrigatórios faltando' };
  }

  if (!validarEmail(email)) {
    throw { status: 400, message: 'Email inválido' };
  }
};

module.exports = { validarDadosAluno };