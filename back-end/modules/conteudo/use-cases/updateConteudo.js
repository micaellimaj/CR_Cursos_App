const Conteudo = require('../models/conteudoModel');
const conteudoService = require('../conteudoService');

module.exports = async (id, dadosAtualizados) => {
  const data = await conteudoService.getById(id);
  if (!data) throw new Error("Conteúdo não encontrado.");

  const conteudoModel = new Conteudo({
    ...data,
    ...dadosAtualizados,
    updated_at: new Date().toISOString()
  });

  await conteudoService.update(id, conteudoModel.toJSON());

  return { 
    message: "Conteúdo atualizado!", 
    data: conteudoModel.toJSON() 
  };
};