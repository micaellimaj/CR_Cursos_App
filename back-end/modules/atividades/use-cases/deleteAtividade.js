const atividadeService = require('../atividadeService');

module.exports = async (id) => {
  const atividade = await atividadeService.getById(id);
  
  if (!atividade) {
    throw { status: 404, message: "Atividade não encontrada." };
  }

  if (atividade.urlArquivo) {
    await atividadeService.deleteFileFromStorage(atividade.urlArquivo);
  }

  await atividadeService.delete(id);

  return { message: "Atividade removida com sucesso!" };
};