const { db } = require('../../config/firebase');
const { verificarSenha } = require('../../utils/authUtils');

async function loginAluno(email, senha) {
  const snap = await db.ref('alunos').orderByChild('email').equalTo(email).once('value');
  const alunos = snap.val();
  if (!alunos) return null;

  const userId = Object.keys(alunos)[0];
  const aluno = alunos[userId];

  const senhaOk = await verificarSenha(senha, aluno.senha);
  if (!senhaOk) return null;

  return { id: userId, tipo: 'aluno', nome: aluno.full_name };
}

module.exports = { loginAluno };
