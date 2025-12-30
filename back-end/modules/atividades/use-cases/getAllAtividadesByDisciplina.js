const atividadeService = require('../atividadeService');
const Atividade = require('../models/atividadeModel');

module.exports = async (disciplinaId) => {
  const data = await atividadeService.getAllByDisciplina(disciplinaId);
  
  if (!data) return [];

  return Object.keys(data).map(id => new Atividade({ id, ...data[id] }).toJSON());
};