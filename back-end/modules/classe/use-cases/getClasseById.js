const classeService = require('../classeService');

module.exports = async (id) => {
  const classe = await classeService.getClasseById(id);

  if (!classe) {
    throw { status: 404, message: 'Conteúdo não encontrado.' };
  }

  return classe;
};