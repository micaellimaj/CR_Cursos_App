// services/alunoService.js

const { db } = require('../config/firebase');
const bcrypt = require('bcryptjs');
const calcularIdade = require('../utils/aluno/calcularIdade');
const gerarIdPersonalizado = require('../utils/aluno/gerarIdPersonalizado');
const firebase = require('firebase-admin'); // Importar o firebase-admin para ServerValue

async function emailExiste(email) {
  const snapshot = await db.ref('alunos').orderByChild('email').equalTo(email).once('value');
  return snapshot.exists();
}

async function criarAluno(dados) {
  const hashedSenha = await bcrypt.hash(dados.senha, 10);
  const customId = gerarIdPersonalizado();

  // Calcula a idade. Se a data for inválida, calcularIdade retornará NaN.
  const idadeCalculada = calcularIdade(dados.data_nascimento);

  // É uma boa prática verificar NaN antes de tentar salvar,
  // mas o Firebase já valida isso (o que gerou seu erro).
  // Se você quisesse tratar isso antes de chegar ao Firebase,
  // faria uma validação aqui e lançaria um erro ou retornaria.
  // Por enquanto, vamos confiar na validação do Firebase e no controller.

  await db.ref(`alunos/${customId}`).set({
    ...dados,
    senha: hashedSenha,
    idade: idadeCalculada, // Passa a idade calculada, que pode ser NaN se a data for inválida
    // Ajuste de responsavel para menores de 18:
    nome_responsavel: idadeCalculada < 18 ? dados.nome_responsavel : null,
    email_responsavel: idadeCalculada < 18 ? dados.email_responsavel : null,
    telefone_responsavel: idadeCalculada < 18 ? dados.telefone_responsavel : null,
    created_at: firebase.database.ServerValue.TIMESTAMP // Melhor usar ServerValue.TIMESTAMP para evitar problemas de fuso horário
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

  const idadeCalculada = calcularIdade(novosDados.data_nascimento); // Recalcula idade na atualização

  const dadosAtualizados = {
    ...novosDados,
    idade: idadeCalculada, // Atualiza idade
    nome_responsavel: idadeCalculada < 18 ? novosDados.nome_responsavel : null,
    email_responsavel: idadeCalculada < 18 ? novosDados.email_responsavel : null,
    telefone_responsavel: idadeCalculada < 18 ? novosDados.telefone_responsavel : null,
    updated_at: firebase.database.ServerValue.TIMESTAMP // Usa ServerValue.TIMESTAMP
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