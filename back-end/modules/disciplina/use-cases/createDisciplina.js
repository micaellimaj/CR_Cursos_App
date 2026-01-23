const Disciplina = require('../models/disciplinaModel');
const { validarDadosDisciplina } = require('../types/disciplinaSchema');
const disciplinaService = require('../disciplinaService');
const gerarIdDisciplina = require('../utils/gerarIdDisciplina');

module.exports = async (dados) => {
  validarDadosDisciplina(dados);

  const customId = gerarIdDisciplina();
  const novaDisciplina = new Disciplina({ 
    ...dados, 
    id: customId,
    created_at: new Date().toISOString() 
  });

  await disciplinaService.create(novaDisciplina.id, novaDisciplina.toJSON());

  return { 
    id: novaDisciplina.id, 
    message: "Disciplina criada com sucesso!",
    data: novaDisciplina.toJSON()
  };
};