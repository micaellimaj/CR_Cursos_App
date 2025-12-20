const turmaService = require('../turmaService');

module.exports = async (id) => {
  if (!id) throw { status: 400, message: 'ID da Turma é obrigatório.' };

  const turma = await turmaService.getTurmaPorId(id);
  if (!turma) throw { status: 404, message: 'Turma não encontrada.' };

  const sucesso = await turmaService.deletarTurma(id);
  if (!sucesso) throw { status: 500, message: 'Erro ao deletar turma.' };

  return { message: 'Turma excluída com sucesso.' };
};