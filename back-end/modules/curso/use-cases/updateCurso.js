const Curso = require('../models/cursoModel');
const cursoService = require('../cursoService');

module.exports = async (id, dados) => {
  if (!id) throw { status: 400, message: 'ID obrigatório.' };
  if (Object.keys(dados).length === 0) throw { status: 400, message: 'Nenhum dado fornecido.' };

  const cursoExistente = await cursoService.findById(id);
  if (!cursoExistente) throw { status: 404, message: 'Curso não encontrado.' };

  if (dados.nome && dados.nome !== cursoExistente.nome) {
    const nomeJaExiste = await cursoService.findByNome(dados.nome);
    if (nomeJaExiste) throw { status: 400, message: 'Este nome de curso já existe.' };
  }

  const cursoAtualizado = new Curso({ ...dados });
  delete cursoAtualizado.id;

  const sucesso = await cursoService.update(id, cursoAtualizado.toJSON());
  if (!sucesso) throw { status: 500, message: 'Erro ao atualizar curso.' };

  return { message: 'Curso atualizado com sucesso.' };
};