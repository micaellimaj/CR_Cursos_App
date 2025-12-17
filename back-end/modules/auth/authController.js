const { loginUsuario } = require("./authService");
const { requestPasswordReset } = require("./use-cases/requestPasswordReset");
const { resetPassword } = require("./use-cases/resetPassword");
const crypto = require('crypto');
const { sendEmail } = require('../.././shared/services/emailService');


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
  try {
    const { email } = req.body;
    
    const user = await admin.firestore()
      .collection('alunos')
      .where('email', '==', email)
      .get();
    
    if (user.empty) {
      return res.status(200).json({ 
        message: "Se o e-mail existir, enviaremos instruções." 
      });
    }
    
    const userData = user.docs[0].data();
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordExpires = Date.now() + 3600000; // 1 hora
    
    await admin.firestore()
      .collection('alunos')
      .doc(user.docs[0].id)
      .update({
        resetPasswordToken,
        resetPasswordExpires
      });
    
    console.log('🔍 Token gerado, tentando enviar email...');
    
    try {
      await sendEmail({
        to: email,
        subject: 'Recuperação de Senha - CR Cursos',
        template: 'forgot-password',
        context: {
          name: userData.nome || 'Aluno',
          resetLink: `${process.env.API_URL}/reset-password?token=${resetToken}`
        }
      });
      
      console.log('✅ Email enviado com sucesso');
    } catch (emailError) {
      console.error('❌ Erro ao enviar email:', emailError);
      // Não retorne erro para o cliente por segurança
      // Mas logue o erro para debugging
    }
    
    res.status(200).json({ 
      message: "Se o e-mail existir, enviaremos instruções." 
    });
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
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
