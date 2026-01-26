const getFrequenciaPorTurmaUC = require('./getFrequenciaPorTurma');
const frequenciaService = require('../frequenciaService');

jest.mock('../frequenciaService');

describe('Unit Test: getFrequenciaPorTurma', () => {
  const turmaId = 'TURMA-XYZ';

  it('Deve retornar a lista de frequências da turma', async () => {
    const mockRegistros = [
      { id: 'F1', turma_id: turmaId, aluno_id: 'A1', status: true },
      { id: 'F2', turma_id: turmaId, aluno_id: 'A2', status: true }
    ];
    frequenciaService.getFrequenciaPorTurma.mockResolvedValue(mockRegistros);

    const resultado = await getFrequenciaPorTurmaUC(turmaId);

    expect(Array.isArray(resultado)).toBe(true);
    expect(resultado[0].turma_id).toBe(turmaId);
  });

  it('Deve lançar erro 404 se não houver registros', async () => {
    frequenciaService.getFrequenciaPorTurma.mockResolvedValue([]);

    await expect(getFrequenciaPorTurmaUC(turmaId))
      .rejects.toMatchObject({ status: 404, message: 'Nenhum registro encontrado para esta turma.' });
  });
});