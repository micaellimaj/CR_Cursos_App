const { db } = require('../../shared/config/firebase');
const firebaseAdmin = require('firebase-admin');

const createProfessorService = async (id, dados) => {
  const turmasIniciais = dados.turma_id_principal 
    ? { [dados.turma_id_principal]: true } 
    : {};

  await db.ref(`professores/${id}`).set({
    ...dados,
    turmas: turmasIniciais,
    created_at: firebaseAdmin.database.ServerValue.TIMESTAMP
  });

  return id;
};

const getAllProfessoresService = async () => {
  const snapshot = await db.ref('professores').once('value');
  const data = snapshot.val() || {};

  return Object.entries(data).map(([id, value]) => ({ id, ...value }));
};

const getProfessorByIdService = async (id) => {
  const snapshot = await db.ref(`professores/${id}`).once('value');
  return snapshot.exists() ? snapshot.val() : null;
};

const updateProfessorService = async (id, dados) => {
  const professorRef = db.ref(`professores/${id}`);
  const snapshot = await professorRef.once('value');

  if (!snapshot.exists()) return false;

  await professorRef.update({
    ...dados,
    updated_at: firebaseAdmin.database.ServerValue.TIMESTAMP
  });
  return true;
};

const deleteProfessorService = async (id) => {
  const professorRef = db.ref(`professores/${id}`);
  const snapshot = await professorRef.once('value');

  if (!snapshot.exists()) return false;

  await professorRef.remove();
  return true;
};

const findProfessorByEmail = async (email) => {
  const snapshot = await db.ref('professores').orderByChild('email').equalTo(email).once('value');
  return snapshot.exists();
};

async function adicionarTurmaAoProfessor(professorId, turmaId) {
  const professorRef = db.ref(`professores/${professorId}`);
  await professorRef.child('turmas').update({ [turmaId]: true });
  await professorRef.update({ updated_at: firebaseAdmin.database.ServerValue.TIMESTAMP });
  return true;
}

module.exports = {
  createProfessorService,
  getAllProfessoresService,
  getProfessorByIdService,
  updateProfessorService,
  deleteProfessorService,
  findProfessorByEmail,
  adicionarTurmaAoProfessor
};