const bcrypt = require("bcrypt");
const {
  findUserByResetToken,
  updatePassword
} = require("../../../shared/repositories/userRepository");
const { sendEmail } = require("../../../shared/services/emailService");

async function resetPassword(token, newPassword) {
  const user = await findUserByResetToken(token);

  if (!user || user.resetPasswordExpires < Date.now()) {
    throw new Error("Token inválido ou expirado");
  }

  const senhaHash = await bcrypt.hash(newPassword, 10);

  await updatePassword(user, senhaHash);

  await sendEmail({
    to: user.email,
    subject: "Senha alterada com sucesso",
    template: "passwordChanged",
    context: { nome: user.full_name }
  });
}

module.exports = { resetPassword };
