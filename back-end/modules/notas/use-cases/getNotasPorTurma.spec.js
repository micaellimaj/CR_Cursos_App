const getNotasPorTurma = require('./getNotasPorTurma');
const notaService = require('../notaService');

jest.mock('../notaService');

describe('Unit Test: getNotasPorTurma', () => {
  it('Deve retornar lista de notas para uma turma específica', async () => {
    const mockNotas = [{ id: 'N1', turmaId: 'TURMA-A', valor: 7 }];
    notaService.findByTurma.mockResolvedValue(mockNotas);

    const resultado = await getNotasPorTurma('TURMA-A');

    expect(resultado[0].turmaId).toBe('TURMA-A');
    expect(notaService.findByTurma).toHaveBeenCalledWith('TURMA-A');
  });

  it('Deve lançar erro 400 se turmaId for omitido', async () => {
    await expect(getNotasPorTurma(""))
      .rejects.toMatchObject({ status: 400, message: "ID da turma é obrigatório." });
  });
});