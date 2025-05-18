const { db } = require('../config/firebase');
const bcrypt = require('bcryptjs');
const calcularIdade = require('../utils/aluno/calcularIdade');
const gerarIdPersonalizado = require('../utils/aluno/gerarIdPersonalizado');

async function emailExiste(email) {
  const snapshot = await db.ref('alunos').orderByChild('email').equalTo(email).once('value');
  return snapshot.exists();
}

async function criarAluno(dados) {
  const hashedSenha = await bcrypt.hash(dados.senha, 10);
  const customId = gerarIdPersonalizado();
  const idade = calcularIdade(dados.data_nascimento);

  await db.ref(`alunos/${customId}`).set({
    ...dados,
    senha: hashedSenha,
    idade,
    nome_responsavel: idade < 18 ? dados.nome_responsavel : null,
    email_responsavel: idade < 18 ? dados.email_responsavel : null,
    telefone_responsavel: idade < 18 ? dados.telefone_responsavel : null,
    created_at: new Date().toISOString()
  });

  return customId;
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

  const idade = calcularIdade(novosDados.data_nascimento);
  const dadosAtualizados = {
    ...novosDados,
    idade,
    nome_responsavel: idade < 18 ? novosDados.nome_responsavel : null,
    email_responsavel: idade < 18 ? novosDados.email_responsavel : null,
    telefone_responsavel: idade < 18 ? novosDados.telefone_responsavel : null,
    updated_at: new Date().toISOString()
  };

  await db.ref(`alunos/${id}`).update(dadosAtualizados);
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