const Turma = require('../models/turmaModel');
const { validarDadosTurma } = require('../types/turmaSchema');
const turmaService = require('../turmaService');
const cursoService = require('../../curso/cursoService');
const gerarIdTurma = require('../utils/gerarIdTurma');

module.exports = async (dados) => {
  validarDadosTurma(dados);

  const cursoExistente = await cursoService.findById(dados.curso_id);
  if (!cursoExistente) {
    throw { status: 404, message: `Curso com ID ${dados.curso_id} não encontrado.` };
  }

  const inicio = new Date(dados.data_inicio);
  const fim = new Date(dados.data_fim);
  if (inicio >= fim) {
    throw { status: 400, message: 'A data de início deve ser anterior à data de fim.' };
  }

  const customId = gerarIdTurma();
  const novaTurma = new Turma({ ...dados, id: customId });

  await turmaService.criarTurma(novaTurma.id, novaTurma.toJSON());

  return { 
    id: novaTurma.id, 
    nome: novaTurma.nome, 
    curso: cursoExistente.nome,
    message: 'Turma criada com sucesso' 
  };
};