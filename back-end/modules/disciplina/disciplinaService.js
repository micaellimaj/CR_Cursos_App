const { createDisciplina } = require("./use-cases/createDisciplina");
const { updateDisciplina } = require("./use-cases/updateDisciplina");
const { deleteDisciplina } = require("./use-cases/deleteDisciplina");
const { getDisciplinaById } = require("./use-cases/getDisciplinaById");
const { getAllDisciplinas } = require("./use-cases/getAllDisciplinas");
const { associarTurmaNaDisciplina } = require("./use-cases/associarTurmaNaDisciplina");

async function criarDisciplina(data) {
  return createDisciplina(data);
}

async function atualizarDisciplina(id, data) {
  return updateDisciplina(id, data);
}

async function removerDisciplina(id) {
  return deleteDisciplina(id);
}

async function buscarDisciplinaPorId(id) {
  return getDisciplinaById(id);
}

async function listarDisciplinas() {
  return getAllDisciplinas();
}

async function associarTurma(data) {
  return associarTurmaNaDisciplina(data);
}

module.exports = {
  criarDisciplina,
  atualizarDisciplina,
  removerDisciplina,
  buscarDisciplinaPorId,
  listarDisciplinas,
  associarTurma,
  
};
