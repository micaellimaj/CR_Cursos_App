const { db } = require('../../config/firebase');
const { verificarSenha } = require('../../utils/authUtils');

async function loginProfessor(email, senha) {
  const snap = await db.ref('professores').orderByChild('email').equalTo(email).once('value');
  const profs = snap.val();
  if (!profs) return null;

  const userId = Object.keys(profs)[0];
  const professor = profs[userId];

  const senhaOk = await verificarSenha(senha, professor.senha);
  if (!senhaOk) return null;

  return { id: userId, tipo: 'professor', nome: professor.full_name };
}

module.exports = { loginProfessor };
