const { gerarToken } = require('../../utils/authUtils');
const { loginAluno } = require('./loginAluno');
const { loginProfessor } = require('./loginProfessor');
const { loginAdminDb } = require('./loginAdminDb');
const { loginAdminEnv } = require('./loginAdminEnv');

async function loginUsuarioUseCase(email, senha) {
  let user =
    await loginAluno(email, senha) ||
    await loginProfessor(email, senha) ||
    await loginAdminDb(email, senha) ||
    await loginAdminEnv(email, senha);

  if (!user) {
    return { status: 401, data: 'Credenciais inválidas' };
  }

  const token = gerarToken({ id: user.id, tipo: user.tipo });
  return { status: 200, data: { token, ...user } };
}

module.exports = { loginUsuarioUseCase };
