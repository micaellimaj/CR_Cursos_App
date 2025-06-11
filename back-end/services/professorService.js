// services/professorService.js

const { db } = require('../config/firebase');
const bcrypt = require('bcryptjs');
const gerarIdProfessor = require('../utils/professor/gerarIdProfessor');
const firebaseAdmin = require('firebase-admin'); // Importar o firebase-admin para ServerValue.TIMESTAMP

// Função auxiliar para verificar se o email já existe para um professor
const emailExisteProfessor = async (email, excludeId = null) => {
  let query = db.ref('professores').orderByChild('email').equalTo(email);
  const snapshot = await query.once('value');

  if (!snapshot.exists()) {
    return false; // Email não existe
  }

  // Se o email existe, precisamos verificar se pertence ao mesmo professor (em caso de update)
  const professorData = snapshot.val();
  const professorId = Object.keys(professorData)[0]; // Pega o ID do professor encontrado

  if (excludeId && professorId === excludeId) {
    return false; // Email existe, mas pertence ao professor que está sendo atualizado
  }

  return true; // Email já existe e pertence a outro professor ou a um novo professor
};

const createProfessorService = async (professorData) => {
  const { full_name, email, senha, telefone, data_nascimento, idade } = professorData; // Recebe 'idade'

  // Verificação de e-mail duplicado ANTES de tentar criar
  if (await emailExisteProfessor(email)) {
    throw new Error('Já existe um professor com esse e-mail.');
  }

  const hashedSenha = await bcrypt.hash(senha, 10);
  const customId = gerarIdProfessor();

  await db.ref(`professores/${customId}`).set({
    full_name,
    email,
    senha: hashedSenha,
    telefone: telefone || null,
    data_nascimento: data_nascimento || null, // Garante que é null se não fornecido
    idade: idade, // Salva a idade calculada
    created_at: firebaseAdmin.database.ServerValue.TIMESTAMP // Usar timestamp do servidor
  });

  return customId;
};

const getAllProfessoresService = async () => {
  const snapshot = await db.ref('professores').once('value');
  const data = snapshot.val() || {};

  return Object.entries(data).map(([id, value]) => {
    const { senha, ...resto } = value; // Evita retornar a senha
    return { id, ...resto };
  });
};

const getProfessorByIdService = async (id) => {
  const snapshot = await db.ref(`professores/${id}`).once('value');
  if (!snapshot.exists()) {
    return null;
  }

  const { senha, ...resto } = snapshot.val(); // Evita retornar a senha
  return { id, ...resto };
};

const updateProfessorService = async (id, dados) => {
  const professorRef = db.ref(`professores/${id}`);
  const snapshot = await professorRef.once('value');

  if (!snapshot.exists()) {
    return false; // Professor não encontrado
  }

  // Se o email estiver sendo atualizado, verificar duplicidade (excluindo o próprio professor)
  if (dados.email && dados.email !== snapshot.val().email) {
    if (await emailExisteProfessor(dados.email, id)) {
      throw new Error('Já existe um professor com esse e-mail.');
    }
  }

  const dadosParaAtualizar = { ...dados };

  if (dadosParaAtualizar.senha) {
    dadosParaAtualizar.senha = await bcrypt.hash(dadosParaAtualizar.senha, 10);
  }

  // Adiciona o timestamp de atualização
  dadosParaAtualizar.updated_at = firebaseAdmin.database.ServerValue.TIMESTAMP;

  await professorRef.update(dadosParaAtualizar);
  return true;
};

const deleteProfessorService = async (id) => {
  const professorRef = db.ref(`professores/${id}`);
  const snapshot = await professorRef.once('value');

  if (!snapshot.exists()) {
    return false; // Professor não encontrado para deletar
  }

  await professorRef.remove();
  return true;
};

module.exports = {
  createProfessorService,
  getAllProfessoresService,
  getProfessorByIdService,
  updateProfessorService,
  deleteProfessorService
};