const conteudoService = require('../conteudoService');

module.exports = async (id) => {
  const data = await conteudoService.getById(id);
  if (!data) throw new Error("Conteúdo não encontrado.");

  if (data.tipo === 'arquivo' && data.url) {
    await conteudoService.deleteFromStorage(data.url);
  }

  await conteudoService.delete(id);
  return { message: "Conteúdo removido com sucesso!" };
};