const { db } = require('../config/firebase');
const bcrypt = require('bcryptjs');
const gerarIdProfessor = require('../utils/professor/gerarIdProfessor');

const createProfessorService = async (professorData) => {
  const { full_name, email, senha, confirmarSenha, telefone, data_nascimento } = professorData;

  if (!full_name || !email || !senha || !confirmarSenha) {
    throw new Error('Campos obrigatórios faltando');
  }

  if (senha !== confirmarSenha) {
    throw new Error('As senhas não coincidem');
  }

  const hashedSenha = await bcrypt.hash(senha, 10);
  const customId = gerarIdProfessor();

  await db.ref(`professores/${customId}`).set({
    full_name,
    email,
    senha: hashedSenha,
    telefone: telefone || null,
    data_nascimento: data_nascimento || null,
    created_at: new Date().toISOString()
  });

  return customId;
};

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
  if (dados.senha) {
    dados.senha = await bcrypt.hash(dados.senha, 10);
  }

  await db.ref(`professores/${id}`).update(dados);
};

const deleteProfessorService = async (id) => {
  await db.ref(`professores/${id}`).remove();
};

module.exports = {
  createProfessorService,
  getAllProfessoresService,
  getProfessorByIdService,
  updateProfessorService,
  deleteProfessorService
};
