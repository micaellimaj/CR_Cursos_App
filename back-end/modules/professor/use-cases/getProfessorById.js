const Professor = require('../models/professorModel');
const { getProfessorByIdService } = require('../professorService');

module.exports = async (id) => {
  const dados = await getProfessorByIdService(id);
  if (!dados) throw { status: 404, message: 'Professor não encontrado.' };
  
  return new Professor({ id, ...dados });
};

