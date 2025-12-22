const Frequencia = require('../models/frequenciaModel');
const { validarDadosFrequencia } = require('../types/frequenciaSchema');
const { registrarFrequencias } = require('../frequenciaService');
const gerarIdPersonalizado = require('../../aluno/utils/gerarIdPersonalizado');

module.exports = async (payload) => {
  const { turma_id, disciplina_id, professor_id, data, alunos } = payload;
  const batchUpdates = {};
  const agora = new Date().toISOString();

  alunos.forEach(aluno => {
    const dados = { aluno_id: aluno.aluno_id, turma_id, disciplina_id, professor_id, data, status: aluno.status };
    validarDadosFrequencia(dados);

    const customId = gerarIdPersonalizado();
    const instanciaFrequencia = new Frequencia({
      ...dados,
      id: customId,
      created_at: agora,
      updated_at: agora
    });

    batchUpdates[`frequencias/${customId}`] = instanciaFrequencia.toJSON();
  });

  await registrarFrequencias(batchUpdates);
  return { message: 'Chamada registrada com sucesso!' };
};