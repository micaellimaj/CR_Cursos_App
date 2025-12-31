const classeService = require('../classeService');

module.exports = async (turma_id) => {
  if (!turma_id) {
    throw { status: 400, message: 'O ID da turma é obrigatório.' };
  }

  const classes = await classeService.getClassesByTurma(turma_id);

  return classes;
};