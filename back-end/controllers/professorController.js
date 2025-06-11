const {
  createProfessorService,
  getAllProfessoresService,
  getProfessorByIdService,
  updateProfessorService,
  deleteProfessorService
} = require('../services/professorService');

const createProfessor = async (req, res) => {
  try {
    const id = await createProfessorService(req.body);
    res.status(201).send({ id, message: 'Professor criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar professor:', error.message);
    res.status(400).send(error.message);
  }
};

const getAllProfessores = async (req, res) => {
  try {
    const professores = await getAllProfessoresService();
    res.status(200).send(professores);
  } catch (error) {
    console.error('Erro ao buscar professores:', error);
    res.status(500).send('Erro interno');
  }
};

const getProfessorById = async (req, res) => {
  try {
    const professor = await getProfessorByIdService(req.params.id);
    if (!professor) {
      return res.status(404).send('Professor não encontrado');
    }

    res.status(200).send(professor);
  } catch (error) {
    console.error('Erro ao buscar professor:', error);
    res.status(500).send('Erro interno');
  }
};

const updateProfessor = async (req, res) => {
  try {
    await updateProfessorService(req.params.id, req.body);
    res.status(200).send('Professor atualizado com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar professor:', error);
    res.status(500).send('Erro interno');
  }
};

const deleteProfessor = async (req, res) => {
  try {
    await deleteProfessorService(req.params.id);
    res.status(200).send('Professor excluído com sucesso');
  } catch (error) {
    console.error('Erro ao excluir professor:', error);
    res.status(500).send('Erro interno');
  }
};

module.exports = {
  createProfessor,
  getAllProfessores,
  getProfessorById,
  updateProfessor,
  deleteProfessor
};
