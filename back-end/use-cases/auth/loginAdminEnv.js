const bcrypt = require('bcryptjs');
const { db } = require('../../config/firebase');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_SENHA = process.env.ADMIN_SENHA;

async function loginAdminEnv(email, senha) {
  if (email !== ADMIN_EMAIL) return null;

  const snap = await db.ref('administradores').orderByChild('email').equalTo(email).once('value');
  const existing = snap.val();

  if (existing) {
    const adminId = Object.keys(existing)[0];
    const admin = existing[adminId];

    const senhaOk = await bcrypt.compare(senha, admin.senha);
    if (!senhaOk) return null;

    return { id: adminId, tipo: 'admin', nome: admin.full_name };
  }


  const hash = await bcrypt.hash(ADMIN_SENHA, 10);
  const novoRef = db.ref('administradores').push();
  const novoAdmin = { full_name: 'Administrador Principal', email: ADMIN_EMAIL, senha: hash };
  await novoRef.set(novoAdmin);

  if (senha !== ADMIN_SENHA) return null;

  return { id: novoRef.key, tipo: 'admin', nome: novoAdmin.full_name };
}

module.exports = { loginAdminEnv };
