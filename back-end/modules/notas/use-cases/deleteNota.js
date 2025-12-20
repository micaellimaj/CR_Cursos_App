const notaService = require('../notaService');

module.exports = async (id) => {
  if (!id) throw { status: 400, message: "ID da nota não informado." };

  const nota = await notaService.findById(id);
  if (!nota) throw { status: 404, message: "Nota não encontrada." };

  await notaService.remove(id);

  return { message: "Nota removida com sucesso!" };
};