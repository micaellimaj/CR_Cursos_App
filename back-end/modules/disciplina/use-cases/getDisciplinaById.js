const Disciplina = require('../models/disciplinaModel');
const disciplinaService = require('../disciplinaService');

module.exports = async (id) => {
  if (!id) throw { status: 400, message: "ID não informado." };

  const dados = await disciplinaService.findById(id);

  if (!dados) {
    throw { status: 404, message: "Disciplina não encontrada." };
  }

  return new Disciplina({ id, ...dados }).toJSON();
};