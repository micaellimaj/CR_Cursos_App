const { deleteProfessorService } = require('../professorService');

module.exports = async (id) => {
  const deleted = await deleteProfessorService(id);
  if (!deleted) throw { status: 404, message: 'Professor não encontrado.' };
  return { message: 'Professor removido com sucesso' };
};