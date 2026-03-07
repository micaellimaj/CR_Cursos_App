const { db } = require('../../../shared/config/firebase');
const Admin = require('../../../shared/models/Admin');

async function getAdminById(adminId) {
  const snap = await db.ref(`administradores/${adminId}`).once('value');
  const data = snap.val();

  if (!data) throw { status: 404, message: 'Administrador não encontrado' };

  const admin = new Admin({ id: adminId, ...data });
  
  const { senha, ...perfilPublico } = admin;
  return perfilPublico;
}

module.exports = { getAdminById };