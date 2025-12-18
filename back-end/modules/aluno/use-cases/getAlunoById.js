const Aluno = require('../models/alunoModel');
const { getAlunoPorId } = require('../alunoService');

module.exports = async (id) => {
  const dadosBanco = await getAlunoPorId(id);
  
  if (!dadosBanco) {
    throw { status: 404, message: 'Aluno não encontrado' };
  }

  return new Aluno({ id, ...dadosBanco });
};