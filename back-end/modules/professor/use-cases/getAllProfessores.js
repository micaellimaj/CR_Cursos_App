const { getAllProfessoresService } = require('../professorService');

async function getAllProfessoresUseCase() {
  return await getAllProfessoresService();
}

module.exports = getAllProfessoresUseCase;
