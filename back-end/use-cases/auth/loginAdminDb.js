const { db } = require('../../config/firebase');
const { verificarSenha } = require('../../utils/authUtils');

async function loginAdminDb(email, senha) {
  const snap = await db.ref('administradores').orderByChild('email').equalTo(email).once('value');
  const admins = snap.val();
  if (!admins) return null;

  const userId = Object.keys(admins)[0];
  const admin = admins[userId];

  const senhaOk = await verificarSenha(senha, admin.senha);
  if (!senhaOk) return null;

  return { id: userId, tipo: 'admin', nome: admin.full_name };
}

module.exports = { loginAdminDb };
