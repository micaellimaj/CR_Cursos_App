const classeService = require('../classeService');

module.exports = async (id) => {
  const classeExistente = await classeService.getClasseById(id);
  
  if (!classeExistente) {
    throw { status: 404, message: 'Postagem não encontrada para exclusão.' };
  }

  await classeService.deletarClasse(id);

  return {
    message: 'Postagem removida com sucesso'
  };
};