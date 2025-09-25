const { db } = require('../config/firebase');

async function emailExiste(email) {
  const snapshot = await db.ref('alunos').orderByChild('email').equalTo(email).once('value');
  return snapshot.exists();
}

async function criarAluno(id, dados) {
  await db.ref(`alunos/${id}`).set({
    ...dados,
    created_at: new Date().toISOString()
  });
  return id;
}

async function getTodosAlunos() {
  const snapshot = await db.ref('alunos').once('value');
  const alunos = snapshot.val() || {};
  return Object.entries(alunos).map(([id, data]) => ({ id, ...data }));
}

async function getAlunoPorId(id) {
  const snapshot = await db.ref(`alunos/${id}`).once('value');
  if (!snapshot.exists()) return null;
  return snapshot.val();
}

async function atualizarAluno(id, novosDados) {
  const dadosExistentesSnap = await db.ref(`alunos/${id}`).once('value');
  if (!dadosExistentesSnap.exists()) return false;

  await db.ref(`alunos/${id}`).update({
    ...novosDados,
    updated_at: new Date().toISOString()
  });

  return true;
}

async function deletarAluno(id) {
  const snapshot = await db.ref(`alunos/${id}`).once('value');
  if (!snapshot.exists()) return false;
  await db.ref(`alunos/${id}`).remove();
  return true;
}

module.exports = {
  emailExiste,
  criarAluno,
  getTodosAlunos,
  getAlunoPorId,
  atualizarAluno,
  deletarAluno
};
