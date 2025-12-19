const Curso = require('../models/cursoModel');
const cursoService = require('../cursoService');

module.exports = async () => {
  const cursos = await cursoService.findAll();
  return cursos.map(c => new Curso(c).toJSON());
};