const { loginUsuario } = require("./authService");
const { requestPasswordReset } = require("./use-cases/requestPasswordReset");
const { resetPassword } = require("./use-cases/resetPassword");

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).send("Email e senha são obrigatórios");
  }

  try {
    const resultado = await loginUsuario(email, senha);
    return res.status(resultado.status).send(resultado.data);
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).send("Erro interno");
  }
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    await requestPasswordReset(email);
  } catch (error) {
    console.error("Erro ao solicitar reset:", error);
    // NÃO retorna erro para o usuário
  }

  return res.status(200).json({
    message: "Se o e-mail existir, enviaremos instruções."
  });
};


const changePassword = async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body;

  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: "Senha muito curta" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "As senhas não coincidem" });
  }

  try {
    await resetPassword(token, newPassword);
    return res.status(200).json({ message: "Senha alterada com sucesso" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};



const logout = async (req, res) => {
  return res.status(200).json({ message: "Logout realizado com sucesso" });
};

module.exports = { login, logout, forgotPassword, changePassword };
