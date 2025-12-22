const { getFrequenciaPorTurma } = require('../frequenciaService');
const Frequencia = require('../models/frequenciaModel');

module.exports = async (turmaId) => {
  if (!turmaId) throw { status: 400, message: 'ID da turma é obrigatório.' };

  const registros = await getFrequenciaPorTurma(turmaId);

  if (registros.length === 0) {
    throw { status: 404, message: 'Nenhum registro encontrado para esta turma.' };
  }

  return registros.map(item => new Frequencia(item).toJSON());
};