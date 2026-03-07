const { db } = require('../../../shared/config/firebase');
const { validarDadosAdmin } = require('../types/adminSchema');
const bcrypt = require('bcrypt');

async function updateAdmin(adminId, dadosNovos) {
  validarDadosAdmin(dadosNovos, true);

  const updatePayload = {};
  if (dadosNovos.full_name) updatePayload.full_name = dadosNovos.full_name;
  if (dadosNovos.email) updatePayload.email = dadosNovos.email;
  
  if (dadosNovos.senha) {
    updatePayload.senha = await bcrypt.hash(dadosNovos.senha, 10);
  }

  await db.ref(`administradores/${adminId}`).update(updatePayload);

  return { message: "Perfil atualizado com sucesso" };
}

module.exports = { updateAdmin };