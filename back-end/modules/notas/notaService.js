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

// ------------
// Funções no padrão disciplinaService
// ------------

async function criar(data) {
  return createNota(data);
}

async function atualizar(id, data) {
  return updateNota(id, data);
}

async function remover(id) {
  return deleteNota(id);
}

async function buscarPorId(id) {
  return getNotaById(id);
}

async function listarPorAluno(aluno_id) {
  return getNotasPorAluno(aluno_id);
}

async function listarPorDisciplina(disciplina_id) {
  return getNotasPorDisciplina(disciplina_id);
}

async function listarPorProfessor(professor_id) {
  return getNotasPorProfessor(professor_id);
}

async function listarPorTurma(turma_id) {
  return getNotasPorTurma(turma_id);
}

async function validarPermissao(professor_id, turma_id) {
  return validarPermissaoProfessor(professor_id, turma_id);
}

module.exports = {
  criar,
  atualizar,
  remover,
  buscarPorId,
  listarPorAluno,
  listarPorDisciplina,
  listarPorProfessor,
  listarPorTurma,
  validarPermissao
};
