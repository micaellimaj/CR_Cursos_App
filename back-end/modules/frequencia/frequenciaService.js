const { db } = require('../../shared/config/firebase');

async function registrarFrequencias(registros) {
  await db.ref().update(registros);
  return true;
}

async function getFrequenciaPorAluno(alunoId) {
  const snapshot = await db.ref('frequencias')
    .orderByChild('aluno_id')
    .equalTo(alunoId)
    .once('value');
  
  const dados = snapshot.val() || {};
  return Object.entries(dados).map(([id, data]) => ({ id, ...data }));
}

async function getFrequenciaPorTurma(turmaId) {
  const snapshot = await db.ref('frequencias')
    .orderByChild('turma_id')
    .equalTo(turmaId)
    .once('value');
    
  const todas = snapshot.val() || {};
  return Object.entries(todas).map(([id, val]) => ({ id, ...val }));
}

async function atualizarFrequencia(id, dados) {
  const ref = db.ref(`frequencias/${id}`);
  await ref.update(dados);
  return true;
}

async function deletarFrequencia(id) {
  await db.ref(`frequencias/${id}`).remove();
  return true;
}

module.exports = {
  registrarFrequencias,
  getFrequenciaPorAluno,
  getFrequenciaPorTurma,
  atualizarFrequencia,
  deletarFrequencia
};