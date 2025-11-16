const { getProfessorByIdService } = require('../../services/professorService');

async function getProfessorByIdUseCase(id) {
  const professor = await getProfessorByIdService(id);
  if (!professor) {
    throw new Error('Professor não encontrado.');
  }
  return professor;
}

module.exports = getProfessorByIdUseCase;
