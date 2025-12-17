const { loginUsuario } = require("./authService");
const { requestPasswordReset } = require("./use-cases/requestPasswordReset");
const { resetPassword } = require("./use-cases/resetPassword");
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { sendEmail } = require('../.././shared/services/emailService');
const { admin } = require('../.././shared/config/firebase'); 


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
    
    console.log('🔍 Buscando usuário com email: ' + email);
    
    // ✅ Query usando Realtime Database
    const usersRef = admin.database().ref('alunos');
    const snapshot = await usersRef
      .orderByChild('email')
      .equalTo(email)
      .once('value');
    
    if (!snapshot.exists()) {
      console.log('📧 Email não encontrado, mas retornando sucesso por segurança');
      return res.status(200).json({ 
        message: "Se o e-mail existir, enviaremos instruções." 
      });
    }
    
    // Obter o primeiro usuário encontrado
    const userData = Object.values(snapshot.val())[0];
    const userId = Object.keys(snapshot.val())[0];
    
    // ✅ CORREÇÃO: Gerar e declarar o token ANTES de usá-lo
    const resetPasswordToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordExpires = Date.now() + 3600000; // 1 hora
    
    console.log('✅ Token gerado:', resetPasswordToken.substring(0, 8) + '...');
    // ✅ Atualizar nó do usuário com tratamento de erro
    await admin.database().ref(`alunos/${userId}`).update({
      resetPasswordToken,
      resetPasswordExpires
    });
    
    console.log('✅ Token salvo no Realtime Database');
    
    // Enviar email (com tratamento de erro)
    try {
      await sendEmail({
        to: email,
        subject: 'Recuperação de Senha - CR Cursos',
        template: 'forgot-password',
        context: {
          name: userData.nome || 'Aluno',
          resetLink: (process.env.API_URL || 'http://localhost:5000') + '/reset-password?token=' + resetPasswordToken
        }
      });
      
      console.log('✅ Email enviado com sucesso');
    } catch (emailError) {
      console.error('❌ Erro ao enviar email:', emailError);
      // Não falhar a requisição se o email falhar
    }
    
    res.status(200).json({ 
      message: "Se o e-mail existir, enviaremos instruções." 
    });
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
    
    // ✅ Tratamento específico para NOT_FOUND
    if (error.code === 5) {
      console.error('💡 Erro 5 NOT_FOUND: Verifique a configuração do Firebase');
      return res.status(500).json({ 
        error: "Erro de configuração do banco de dados",
        details: "Realtime Database não encontrou o recurso solicitado"
      });
    }
    
    res.status(500).json({ 
      error: "Erro interno do servidor" 
    });
  }
};

// GET - Mostrar página de reset de senha (usando template)
const showResetPasswordPage = async (req, res) => {
  try {
    const { token, userId } = req.query;
    
    if (!token || !userId) {
      return res.status(400).render('reset-password', {
        error: 'Token e userId são obrigatórios',
        token: '',
        userId: '',
        nome: ''
      });
    }

    // Verificar se o token é válido no Firebase Realtime Database
    const userRef = admin.database().ref(`alunos/${userId}`);
    const snapshot = await userRef.once('value');
    const userData = snapshot.val();

    if (!userData || !userData.resetPasswordToken) {
      return res.status(400).render('reset-password', {
        error: 'Token inválido ou expirado',
        token: '',
        userId: '',
        nome: ''
      });
    }

    // Verificar se o token não expirou
    if (Date.now() > userData.resetPasswordExpires) {
      return res.status(400).render('reset-password', {
        error: 'Token expirado. Solicite nova recuperação de senha.',
        token: '',
        userId: '',
        nome: ''
      });
    }

    // Renderizar o template com os dados do usuário
    res.render('reset-password', {
      token: token,
      userId: userId,
      nome: userData.nome || 'Aluno',
      error: null,
      success: null
    });
    
  } catch (error) {
    console.error('❌ Erro ao mostrar página de reset:', error);
    res.status(500).render('reset-password', {
      error: 'Erro ao processar solicitação',
      token: '',
      userId: '',
      nome: ''
    });
  }
};

// POST - Processar o reset de senha (controller)
const processResetPassword = async (req, res) => {
  try {
    const { token, userId, password, confirmPassword } = req.body;
    
    // Validações básicas
    if (!token || !userId || !password || !confirmPassword) {
      return res.render('reset-password', {
        error: 'Todos os campos são obrigatórios',
        token: token,
        userId: userId,
        nome: ''
      });
    }
    
    if (password !== confirmPassword) {
      return res.render('reset-password', {
        error: 'As senhas não coincidem',
        token: token,
        userId: userId,
        nome: ''
      });
    }
    
    if (password.length < 6) {
      return res.render('reset-password', {
        error: 'A senha deve ter pelo menos 6 caracteres',
        token: token,
        userId: userId,
        nome: ''
      });
    }

    // Verificar token no Firebase
    const userRef = admin.database().ref(`alunos/${userId}`);
    const snapshot = await userRef.once('value');
    const userData = snapshot.val();

    if (!userData || userData.resetPasswordToken !== token) {
      return res.render('reset-password', {
        error: 'Token inválido',
        token: '',
        userId: '',
        nome: ''
      });
    }

    if (Date.now() > userData.resetPasswordExpires) {
      return res.render('reset-password', {
        error: 'Token expirado',
        token: '',
        userId: '',
        nome: ''
      });
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Atualizar senha e limpar token
    await userRef.update({
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null
    });

    // Enviar email de confirmação
    await sendPasswordChangeConfirmation(userData.email, userData.nome);

    // Renderizar página de sucesso
    res.render('reset-success', {
      nome: userData.nome || 'Aluno'
    });
    
  } catch (error) {
    console.error('❌ Erro ao resetar senha:', error);
    res.render('reset-password', {
      error: 'Erro ao processar solicitação',
      token: req.body.token || '',
      userId: req.body.userId || '',
      nome: ''
    });
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

module.exports = { login, logout, forgotPassword, changePassword, showResetPasswordPage, resetPassword: processResetPassword  };
