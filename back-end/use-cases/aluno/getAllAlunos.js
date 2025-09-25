const { getTodosAlunos } = require('../../services/alunoService');

module.exports = async () => {
  return await getTodosAlunos();
};
