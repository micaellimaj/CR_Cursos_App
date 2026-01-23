const Nota = require('../models/notaModel');
const { validarDadosNota } = require('../types/notaSchema');
const notaService = require('../notaService');
const validarPermissaoProfessor = require('./validarPermissaoProfessor');
const gerarIdNota = require('../utils/gerarIdNota');

module.exports = async (dados) => {
  validarDadosNota(dados);

  await validarPermissaoProfessor(
    dados.professorId, 
    dados.turmaId, 
    dados.disciplinaId, 
    dados.alunoId
  );

  const customId = gerarIdNota();
  const novaNota = new Nota({ 
    ...dados, 
    id: customId,
  });

  await notaService.create(novaNota.id, novaNota.toJSON());

  return { 
    id: novaNota.id, 
    message: "Nota lançada com sucesso!",
    data: novaNota.toJSON() 
  };
};