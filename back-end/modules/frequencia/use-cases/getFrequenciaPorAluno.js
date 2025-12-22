const { getFrequenciaPorAluno } = require('../frequenciaService');
const Frequencia = require('../models/frequenciaModel');

module.exports = async (alunoId) => {
  if (!alunoId) throw { status: 400, message: 'ID do aluno é obrigatório.' };

  const dadosBrutos = await getFrequenciaPorAluno(alunoId);

  const historico = dadosBrutos.map(item => new Frequencia(item));

  const resumo = historico.reduce((acc, curr) => {
    curr.status ? acc.presencas++ : acc.faltas++;
    return acc;
  }, { presencas: 0, faltas: 0 });

  return {
    alunoId,
    resumo,
    historico: historico.map(f => f.toJSON())
  };
};