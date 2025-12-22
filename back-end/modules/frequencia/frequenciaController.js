const registrarChamadaUC = require('./use-cases/registrarChamada');
const getFrequenciaPorAlunoUC = require('./use-cases/getFrequenciaPorAluno');
const getFrequenciaPorTurmaUC = require('./use-cases/getFrequenciaPorTurma');
const updateFrequenciaUC = require('./use-cases/updateFrequencia');
const deleteFrequenciaUC = require('./use-cases/deleteFrequencia');

const registrarChamada = async (req, res) => {
  try {
    const result = await registrarChamadaUC(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Erro ao registrar chamada' });
  }
};

const getFrequenciaPorAluno = async (req, res) => {
  try {
    const frequencias = await getFrequenciaPorAlunoUC(req.params.alunoId);
    res.status(200).json(frequencias);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const getFrequenciaPorTurma = async (req, res) => {
  try {
    const { turmaId } = req.params;
    const result = await getFrequenciaPorTurmaUC(turmaId);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ 
      message: error.message || 'Erro ao buscar frequências da turma' 
    });
  }
};

const updateFrequencia = async (req, res) => {
  try {
    const result = await updateFrequenciaUC(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const deleteFrequencia = async (req, res) => {
  try {
    const result = await deleteFrequenciaUC(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  registrarChamada,
  getFrequenciaPorAluno,
  getFrequenciaPorTurma,
  updateFrequencia,
  deleteFrequencia
};