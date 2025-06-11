const { verificarCredenciaisAdmin } = require('../services/adminService');
const { gerarToken } = require('../utils/authUtils');

const loginAdmin = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).send('Email e senha são obrigatórios');
  }

  try {
    const isValid = await verificarCredenciaisAdmin(email, senha);
    if (!isValid) return res.status(401).send('Credenciais inválidas');

    const token = gerarToken({ email, tipo: 'admin' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Erro no login do admin:', error);
    res.status(500).send('Erro interno');
  }
};

module.exports = {
  loginAdmin
};
