const Curso = require('../models/cursoModel');
const { validarDadosCurso } = require('../types/cursoSchema');
const cursoService = require('../cursoService');
const gerarIdPersonalizado = require('../../aluno/utils/gerarIdPersonalizado'); 

module.exports = async (dados) => {
  validarDadosCurso(dados);

  const cursoExistente = await cursoService.findByNome(dados.nome);
  if (cursoExistente) {
    throw { status: 400, message: `Já existe um curso com o nome "${dados.nome}".` };
  }

  const customId = gerarIdPersonalizado();
  const novoCurso = new Curso({ ...dados, id: customId });

  await cursoService.create(novoCurso.id, novoCurso.toJSON());

  return { 
    id: novoCurso.id, 
    nome: novoCurso.nome, 
    message: 'Curso criado com sucesso' 
  };
};