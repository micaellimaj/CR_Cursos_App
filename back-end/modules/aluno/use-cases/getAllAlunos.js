const { getTodosAlunos } = require('../alunoService');

module.exports = async () => {
  return await getTodosAlunos();
};
