const { getAlunoPorId } = require('../../services/alunoService');

module.exports = async (id) => {
  const aluno = await getAlunoPorId(id);
  if (!aluno) {
    throw { status: 404, message: 'Aluno não encontrado' };
  }
  return { id, ...aluno };
};
