const crypto = require("crypto");
const {
  findUserByEmail,
  saveResetToken
} = require("../../../shared/repositories/userRepository");
const { sendEmail } = require("../../../shared/services/emailService");

async function requestPasswordReset(email) {
  const user = await findUserByEmail(email);

  // segurança: não revela se existe
  if (!user) return;

  const token = crypto.randomBytes(32).toString("hex");

  await saveResetToken(user, token);

  const resetLink = `${process.env.API_URL}/auth/reset-password?token=${token}`;

  await sendEmail({
    to: user.email,
    subject: "Redefinição de senha",
    template: "resetPassword",
    context: {
      nome: user.full_name,
      resetLink
    }
  });
}

module.exports = { requestPasswordReset };
