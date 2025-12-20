const { db } = require('../../shared/config/firebase'); 
const ENTIDADE = 'notas';

async function create(id, dados) {
  await db.ref(`${ENTIDADE}/${id}`).set({
    ...dados,
    created_at: new Date().toISOString()
  });
  return id;
}

async function findById(id) {
  const snapshot = await db.ref(`${ENTIDADE}/${id}`).once('value');
  return snapshot.exists() ? { id, ...snapshot.val() } : null;
}

async function findByAluno(alunoId) {
  const snapshot = await db.ref(ENTIDADE).orderByChild('alunoId').equalTo(alunoId).once('value');
  const data = snapshot.val() || {};
  return Object.entries(data).map(([id, values]) => ({ id, ...values }));
}

async function findByDisciplina(disciplinaId) {
  const snapshot = await db.ref(ENTIDADE).orderByChild('disciplinaId').equalTo(disciplinaId).once('value');
  const data = snapshot.val() || {};
  return Object.entries(data).map(([id, values]) => ({ id, ...values }));
}

async function findByProfessor(professorId) {
  const snapshot = await db.ref(ENTIDADE).orderByChild('professorId').equalTo(professorId).once('value');
  const data = snapshot.val() || {};
  return Object.entries(data).map(([id, values]) => ({ id, ...values }));
}

async function findByTurma(turmaId) {
  const snapshot = await db.ref(ENTIDADE).orderByChild('turmaId').equalTo(turmaId).once('value');
  const data = snapshot.val() || {};
  return Object.entries(data).map(([id, values]) => ({ id, ...values }));
}

async function update(id, novosDados) {
  const ref = db.ref(`${ENTIDADE}/${id}`);
  await ref.update({
    ...novosDados,
    updated_at: new Date().toISOString()
  });
  return true;
}

async function remove(id) {
  await db.ref(`${ENTIDADE}/${id}`).remove();
  return true;
}

module.exports = {
  create,
  findById,
  findByAluno,
  findByDisciplina,
  findByProfessor,
  findByTurma,
  update,
  remove
};