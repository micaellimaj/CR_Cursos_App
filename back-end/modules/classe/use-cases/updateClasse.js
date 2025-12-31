const Classe = require('../models/classeModel');
const classeService = require('../classeService');

module.exports = async (id, dadosAtualizados) => {
  const classeExistente = await classeService.getClasseById(id);
  
  if (!classeExistente) {
    throw { status: 404, message: 'Postagem não encontrada.' };
  }

  const classeEditada = new Classe({
    ...classeExistente,
    ...dadosAtualizados,
    updated_at: new Date().toISOString()
  });

  await classeService.atualizarClasse(id, classeEditada.toJSON());

  return {
    id,
    message: 'Conteúdo atualizado com sucesso'
  };
};