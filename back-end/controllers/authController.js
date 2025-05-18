const { loginUsuario } = require('../services/authService');

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).send('Email e senha são obrigatórios');
  }

  try {
    const resultado = await loginUsuario(email, senha);
    return res.status(resultado.status).send(resultado.data);
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).send('Erro interno');
  }
};

module.exports = { login };
