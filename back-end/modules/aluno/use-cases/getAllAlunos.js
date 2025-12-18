const Aluno = require('../models/alunoModel');
const { getTodosAlunos } = require('../alunoService');

module.exports = async () => {
  const listaAlunos = await getTodosAlunos();
  
  return listaAlunos.map(dados => new Aluno(dados));
};