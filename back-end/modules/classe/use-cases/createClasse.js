const Classe = require('../models/classeModel');
const { validarDadosClasse } = require('../types/classeSchema');
const classeService = require('../classeService');
const turmaService = require('../../turma/turmaService');
const gerarIdClasse = require('../utils/gerarIdClasse');

module.exports = async (dados) => {
  validarDadosClasse(dados);

  const turmaExistente = await turmaService.getTurmaById(dados.turma_id);
  if (!turmaExistente) {
    throw { status: 404, message: `Turma com ID ${dados.turma_id} não encontrada.` };
  }

  const customId = gerarIdClasse();
  
  const novaClasse = new Classe({ 
    ...dados, 
    id: customId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  await classeService.criarClasse(novaClasse.id, novaClasse.toJSON());

  return { 
    id: novaClasse.id, 
    titulo: novaClasse.titulo, 
    turma: turmaExistente.nome,
    message: 'Postagem de classe criada com sucesso' 
  };
};