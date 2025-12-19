const Professor = require('../models/professorModel');
const { getAllProfessoresService } = require('../professorService');

module.exports = async () => {
  const lista = await getAllProfessoresService();
  return lista.map(p => new Professor(p));
};