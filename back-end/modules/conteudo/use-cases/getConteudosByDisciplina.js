const Conteudo = require('../models/conteudoModel');
const conteudoService = require('../conteudoService');

module.exports = async (disciplinaId) => {
  if (!disciplinaId) throw new Error("ID da disciplina é obrigatório.");
  
  const rawData = await conteudoService.getByDisciplina(disciplinaId);
  if (!rawData) return [];

  return Object.values(rawData).map(item => new Conteudo(item).toJSON());
};