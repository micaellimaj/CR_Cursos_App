const Atividade = require('../models/atividadeModel');
const atividadeService = require('../atividadeService');

module.exports = async (id) => {
  const data = await atividadeService.getById(id);
  
  if (!data) {
    throw { status: 404, message: "Atividade não encontrada." };
  }

  return new Atividade({ id, ...data }).toJSON();
};