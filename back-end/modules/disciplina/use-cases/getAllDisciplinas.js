const Disciplina = require('../models/disciplinaModel');
const disciplinaService = require('../disciplinaService');

module.exports = async () => {
  const lista = await disciplinaService.findAll();
  
  return lista.map(d => new Disciplina(d).toJSON());
};