const Atividade = require('../models/atividadeModel');
const { validarDadosAtividade } = require('../types/atividadeSchema');
const atividadeService = require('../atividadeService');
const gerarIdAtividade = require('../utils/gerarIdAtividade');

module.exports = async (dados, arquivo) => {
  validarDadosAtividade(dados);

  let urlArquivo = null;

  if (arquivo) {
    urlArquivo = await atividadeService.uploadToStorage(arquivo, dados.disciplinaId);
  }

  const novaAtividade = new Atividade({ 
    ...dados, 
    id: gerarIdAtividade(),
    urlArquivo: urlArquivo,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  await atividadeService.create(novaAtividade.id, novaAtividade.toJSON());

  return { 
    id: novaAtividade.id, 
    message: "Atividade criada com sucesso!",
    data: novaAtividade.toJSON()
  };
};