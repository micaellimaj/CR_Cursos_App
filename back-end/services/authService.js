const { loginUsuarioUseCase } = require('../use-cases/auth/loginUsuario');

async function loginUsuario(email, senha) {
  return await loginUsuarioUseCase(email, senha);
}

module.exports = { loginUsuario };
