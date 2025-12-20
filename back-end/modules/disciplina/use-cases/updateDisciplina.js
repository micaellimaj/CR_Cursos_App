const Disciplina = require('../models/disciplinaModel');
const disciplinaService = require('../disciplinaService');

module.exports = async (id, dados) => {
  if (!id) throw { status: 400, message: "ID da disciplina não informado." };

  const existe = await disciplinaService.findById(id);
  if (!existe) throw { status: 404, message: "Disciplina não encontrada." };

  const disciplinaAtualizada = new Disciplina({ ...dados });
  delete disciplinaAtualizada.id;

  const sucesso = await disciplinaService.update(id, disciplinaAtualizada.toJSON());
  
  if (!sucesso) throw { status: 500, message: "Erro ao atualizar disciplina." };

  return { message: "Disciplina atualizada com sucesso!" };
};