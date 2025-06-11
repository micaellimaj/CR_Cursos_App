const bcrypt = require('bcryptjs');
require('dotenv').config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_SENHA = process.env.ADMIN_SENHA;

async function verificarCredenciaisAdmin(email, senha) {
  if (email !== ADMIN_EMAIL) return false;
  const senhaCorreta = await bcrypt.compare(senha, await gerarHashSenha(ADMIN_SENHA));
  return senhaCorreta;
}

async function gerarHashSenha(senha) {
  return await bcrypt.hash(senha, 10);
}

module.exports = {
  verificarCredenciaisAdmin
};
