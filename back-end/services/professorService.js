const { db } = require('../config/firebase');
const bcrypt = require('bcryptjs');
const gerarIdProfessor = require('../utils/professor/gerarIdProfessor');
const firebaseAdmin = require('firebase-admin');

const createProfessorService = async (professorData) => {
  const { full_name, email, senha, telefone, data_nascimento, idade } = professorData;
  const hashedSenha = await bcrypt.hash(senha, 10);
  const customId = gerarIdProfessor();
  const turmasIniciais = turma_id_principal ? { [turma_id_principal]: true } : {};

  await db.ref(`professores/${customId}`).set({
    full_name,
    email,
    senha: hashedSenha,
    telefone: telefone || null,
    data_nascimento: data_nascimento || null,
    idade,
    turmas: turmasIniciais,
    created_at: firebaseAdmin.database.ServerValue.TIMESTAMP
  });

  return customId;
};

/**
 * Adiciona uma associação de turma a um professor existente.
 * @param {string} professorId
 * @param {string} turmaId
 * @returns {boolean}
 */
async function adicionarTurmaAoProfessor(professorId, turmaId) {
    const professorRef = db.ref(`professores/${professorId}`);
    const snapshot = await professorRef.once('value');

    if (!snapshot.exists()) {
        return false;
    }

    await professorRef.child('turmas').update({
        [turmaId]: true
    });
    
    await professorRef.update({
        updated_at: firebaseAdmin.database.ServerValue.TIMESTAMP
    });

    return true;
}


const getAllProfessoresService = async () => {
  const snapshot = await db.ref('professores').once('value');
  const data = snapshot.val() || {};

  return Object.entries(data).map(([id, value]) => {
    const { senha, ...resto } = value;
    return { id, ...resto };
  });
};

const getProfessorByIdService = async (id) => {
  const snapshot = await db.ref(`professores/${id}`).once('value');
  if (!snapshot.exists()) {
    return null;
  }
  const { senha, ...resto } = snapshot.val();
  return { id, ...resto };
};

const updateProfessorService = async (id, dados) => {
  const professorRef = db.ref(`professores/${id}`);
  const snapshot = await professorRef.once('value');

  if (!snapshot.exists()) {
    return false;
  }

  const dadosParaAtualizar = { ...dados };

  if (dadosParaAtualizar.senha) {
    dadosParaAtualizar.senha = await bcrypt.hash(dadosParaAtualizar.senha, 10);
  }

  dadosParaAtualizar.updated_at = firebaseAdmin.database.ServerValue.TIMESTAMP;

  await professorRef.update(dadosParaAtualizar);
  return true;
};

const deleteProfessorService = async (id) => {
  const professorRef = db.ref(`professores/${id}`);
  const snapshot = await professorRef.once('value');

  if (!snapshot.exists()) {
    return false;
  }

  await professorRef.remove();
  return true;
};


const findProfessorByEmail = async (email) => {
  const snapshot = await db.ref('professores').orderByChild('email').equalTo(email).once('value');
  return snapshot.exists() ? snapshot.val() : null;
};

module.exports = {
  createProfessorService,
  getAllProfessoresService,
  getProfessorByIdService,
  updateProfessorService,
  deleteProfessorService,
  findProfessorByEmail,
  adicionarTurmaAoProfessor
};
