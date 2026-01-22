const Curso = require('../models/cursoModel');
const { validarDadosCurso } = require('../types/cursoSchema');
const { createCursoService, findCursoByName } = require('../cursoService');
const gerarIdCurso = require('../utils/gerarIdCurso');

module.exports = async (dados) => {
  if (validarDadosCurso) {
    validarDadosCurso(dados);
  }

  const cursoExistente = await findCursoByName(dados.nome);
  if (cursoExistente) {
    throw { status: 400, message: 'Já existe um curso cadastrado com este nome.' };
  }

  const customId = gerarIdCurso();
  
  const novoCurso = new Curso({ 
    ...dados, 
    id: customId,
    criado_em: new Date().toISOString()
  });

  const id = await createCursoService(novoCurso.id, novoCurso.toJSON());

  return { 
    id, 
    message: 'Curso criado com sucesso'
  };
};