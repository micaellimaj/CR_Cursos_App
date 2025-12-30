const Atividade = require('../models/atividadeModel');
const atividadeService = require('../atividadeService');

module.exports = async (id, dadosNovos, arquivo) => {
  const atividadeExistente = await atividadeService.getById(id);
  if (!atividadeExistente) {
    throw { status: 404, message: "Atividade não encontrada." };
  }

  let urlArquivo = atividadeExistente.urlArquivo;

  if (arquivo) {
    urlArquivo = await atividadeService.uploadToStorage(arquivo, atividadeExistente.disciplinaId);
  }

  const atividadeAtualizada = new Atividade({
    ...atividadeExistente,
    ...dadosNovos,
    urlArquivo: urlArquivo,
    updated_at: new Date().toISOString()
  });

  await atividadeService.update(id, atividadeAtualizada.toJSON());

  return { message: "Atividade atualizada com sucesso!" };
};