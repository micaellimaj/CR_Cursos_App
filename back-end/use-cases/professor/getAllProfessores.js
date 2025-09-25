const { getAllProfessoresService } = require('../../services/professorService');

async function getAllProfessoresUseCase() {
  return await getAllProfessoresService();
}

module.exports = getAllProfessoresUseCase;
