const { deleteProfessorService } = require('../../services/professorService');

async function deleteProfessorUseCase(id) {
  const deleted = await deleteProfessorService(id);
  if (!deleted) {
    throw new Error('Professor não encontrado.');
  }
  return true;
}

module.exports = deleteProfessorUseCase;
