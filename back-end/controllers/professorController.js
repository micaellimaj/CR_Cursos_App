const createProfessorUseCase = require('../use-cases/professor/createProfessor');
const getAllProfessoresUseCase = require('../use-cases/professor/getAllProfessores');
const getProfessorByIdUseCase = require('../use-cases/professor/getProfessorById');
const updateProfessorUseCase = require('../use-cases/professor/updateProfessor');
const deleteProfessorUseCase = require('../use-cases/professor/deleteProfessor');

async function createProfessor(req, res) {
  try {
    const id = await createProfessorUseCase(req.body);
    res.status(201).json({ id, message: 'Professor criado com sucesso.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllProfessores(req, res) {
  try {
    const professores = await getAllProfessoresUseCase();
    res.status(200).json(professores);
  } catch {
    res.status(500).json({ message: 'Erro ao buscar professores.' });
  }
}

async function getProfessorById(req, res) {
  try {
    const professor = await getProfessorByIdUseCase(req.params.id);
    res.status(200).json(professor);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function updateProfessor(req, res) {
  try {
    await updateProfessorUseCase(req.params.id, req.body);
    res.status(200).json({ message: 'Professor atualizado com sucesso.' });
  } catch (error) {
    if (error.message.includes('Professor não encontrado')) {
      return res.status(404).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
}

async function deleteProfessor(req, res) {
  try {
    await deleteProfessorUseCase(req.params.id);
    res.status(200).json({ message: 'Professor excluído com sucesso.' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports = {
  createProfessor,
  getAllProfessores,
  getProfessorById,
  updateProfessor,
  deleteProfessor
};
