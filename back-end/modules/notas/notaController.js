const createNota = require('./use-cases/createNota');
const updateNota = require('./use-cases/updateNota');
const deleteNota = require('./use-cases/deleteNota');
const getNotaById = require('./use-cases/getNotaById');
const getNotasPorAluno = require('./use-cases/getNotasPorAluno');
const getNotasPorDisciplina = require('./use-cases/getNotasPorDisciplina');
const getNotasPorProfessor = require('./use-cases/getNotasPorProfessor');
const getNotasPorTurma = require('./use-cases/getNotasPorTurma');

const criar = async (req, res) => {
  try {
    const result = await createNota(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const atualizar = async (req, res) => {
  try {
    const result = await updateNota(req.params.id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const deletar = async (req, res) => {
  try {
    const result = await deleteNota(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const result = await getNotaById(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const listarPorAluno = async (req, res) => {
  try {
    const result = await getNotasPorAluno(req.params.aluno_id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const listarPorDisciplina = async (req, res) => {
  try {
    const result = await getNotasPorDisciplina(req.params.disciplina_id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const listarPorProfessor = async (req, res) => {
  try {
    const result = await getNotasPorProfessor(req.params.professor_id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const listarPorTurma = async (req, res) => {
  try {
    const result = await getNotasPorTurma(req.params.turma_id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  criar,
  atualizar,
  deletar,
  buscarPorId,
  listarPorAluno,
  listarPorDisciplina,
  listarPorProfessor,
  listarPorTurma
};