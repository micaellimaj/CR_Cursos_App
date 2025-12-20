const disciplinaService = require('../disciplinaService');

module.exports = async (id) => {
  if (!id) throw { status: 400, message: "ID da disciplina não informado." };

  const disciplina = await disciplinaService.findById(id);
  if (!disciplina) throw { status: 404, message: "Disciplina não encontrada." };

  const sucesso = await disciplinaService.remove(id);
  if (!sucesso) throw { status: 500, message: "Erro ao remover disciplina." };

  return { message: "Disciplina removida com sucesso!" };
};