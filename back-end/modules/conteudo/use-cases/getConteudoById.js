const Conteudo = require('../models/conteudoModel');
const conteudoService = require('../conteudoService');

module.exports = async (id) => {
  const data = await conteudoService.getById(id);
  if (!data) throw new Error("Conteúdo não encontrado.");

  const conteudo = new Conteudo(data);
  return conteudo.toJSON();
};