const { deletarAluno } = require('../../services/alunoService');

module.exports = async (id) => {
  const sucesso = await deletarAluno(id);
  if (!sucesso) {
    throw { status: 404, message: 'Aluno não encontrado' };
  }
  return { message: 'Aluno removido com sucesso' };
};
