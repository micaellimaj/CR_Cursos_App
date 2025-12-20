const createDisciplina = require('./use-cases/createDisciplina');
const updateDisciplina = require('./use-cases/updateDisciplina');
const deleteDisciplina = require('./use-cases/deleteDisciplina');
const getDisciplinaById = require('./use-cases/getDisciplinaById');
const getAllDisciplinas = require('./use-cases/getAllDisciplinas');
const associarTurmaNaDisciplina = require('./use-cases/associarTurmaNaDisciplina');

// Criar
async function criarDisciplinaController(req, res) {
  try {
    const result = await createDisciplina(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erro interno." });
  }
}

// Atualizar
async function atualizarDisciplinaController(req, res) {
  try {
    const { id } = req.params;
    const result = await updateDisciplina(id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erro interno." });
  }
}

// Remover
async function removerDisciplinaController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteDisciplina(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erro interno." });
  }
}

// Buscar por ID
async function getDisciplinaByIdController(req, res) {
  try {
    const { id } = req.params;
    const result = await getDisciplinaById(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erro interno." });
  }
}

// Listar
async function listarDisciplinasController(req, res) {
  try {
    const result = await getAllDisciplinas();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erro interno." });
  }
}

// Associar turma
async function associarTurmaController(req, res) {
  try {
    const result = await associarTurmaNaDisciplina(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message || "Erro interno." });
  }
}

module.exports = {
  criarDisciplinaController,
  atualizarDisciplinaController,
  removerDisciplinaController,
  getDisciplinaByIdController,
  listarDisciplinasController,
  associarTurmaController,
};