const getFrequenciaPorAlunoUC = require('./getFrequenciaPorAluno');
const frequenciaService = require('../frequenciaService');

jest.mock('../frequenciaService');

describe('Unit Test: getFrequenciaPorAluno', () => {
  const alunoId = 'ALU-123';
  const mockDados = [
    { id: '1', aluno_id: alunoId, status: true, data: '10/01/2024' },
    { id: '2', aluno_id: alunoId, status: true, data: '11/01/2024' },
    { id: '3', aluno_id: alunoId, status: false, data: '12/01/2024' }
  ];

  it('Deve retornar o histórico e o resumo (presenças/faltas) corretamente', async () => {
    frequenciaService.getFrequenciaPorAluno.mockResolvedValue(mockDados);

    const resultado = await getFrequenciaPorAlunoUC(alunoId);

    expect(resultado.alunoId).toBe(alunoId);
    expect(resultado.resumo).toEqual({ presencas: 2, faltas: 1 });
    expect(resultado.historico).toHaveLength(3);
  });

  it('Deve lançar erro 400 se o alunoId não for fornecido', async () => {
    await expect(getFrequenciaPorAlunoUC(null))
      .rejects.toMatchObject({ status: 400, message: 'ID do aluno é obrigatório.' });
  });
});