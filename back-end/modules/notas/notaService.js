// notas/notaService.js

const { createNota } = require("./use-cases/createNota");
const { updateNota } = require("./use-cases/updateNota");
const { deleteNota } = require("./use-cases/deleteNota");
const { getNotaById } = require("./use-cases/getNotaById");
const { getNotasPorAluno } = require("./use-cases/getNotasPorAluno");
const { getNotasPorDisciplina } = require("./use-cases/getNotasPorDisciplina");
const { getNotasPorProfessor } = require("./use-cases/getNotasPorProfessor");
const { getNotasPorTurma } = require("./use-cases/getNotasPorTurma");
const { validarPermissaoProfessor } = require("./use-cases/validarPermissaoProfessor");

// ---------------------------
// Funções seguindo o padrão
// ---------------------------

async function criarNota(data) {
  return createNota(data);
}

async function atualizarNota(id, data) {
  return updateNota(id, data);
}

async function removerNota(id) {
  return deleteNota(id);
}

async function buscarNotaPorId(id) {
  return getNotaById(id);
}

async function listarNotasPorAluno(aluno_id) {
  return getNotasPorAluno(aluno_id);
}

async function listarNotasPorDisciplina(disciplina_id) {
  return getNotasPorDisciplina(disciplina_id);
}

async function listarNotasPorProfessor(professor_id) {
  return getNotasPorProfessor(professor_id);
}

async function listarNotasPorTurma(turma_id) {
  return getNotasPorTurma(turma_id);
}

async function validarPermissao(professor_id, turma_id) {
  return validarPermissaoProfessor(professor_id, turma_id);
}

// ---------------------------
// Exportando no padrão disciplinaService
// ---------------------------

module.exports = {
  criarNota,
  atualizarNota,
  removerNota,
  buscarNotaPorId,
  listarNotasPorAluno,
  listarNotasPorDisciplina,
  listarNotasPorProfessor,
  listarNotasPorTurma,
  validarPermissao,
};
