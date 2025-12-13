const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'chave_secreta_teste';

const gerarToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

const verificarSenha = async (senha, hash) => {
  return await bcrypt.compare(senha, hash);
};

module.exports = {
  gerarToken,
  verificarSenha,
};