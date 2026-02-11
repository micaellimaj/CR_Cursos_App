const getAllClassesByTurma = require('./getAllClassesByTurma');
const classeService = require('../classeService');

jest.mock('../classeService');

describe('Unit Test: getAllClassesByTurma', () => {
  it('Deve retornar a lista de classes para uma turma válida', async () => {
    const mockLista = [
      { id: '1', titulo: 'Aula 1' },
      { id: '2', titulo: 'Aula 2' }
    ];
    classeService.getClassesByTurma.mockResolvedValue(mockLista);

    const resultado = await getAllClassesByTurma('TURMA-123');

    expect(Array.isArray(resultado)).toBe(true);
    expect(resultado.length).toBe(2);
    expect(classeService.getClassesByTurma).toHaveBeenCalledWith('TURMA-123');
  });

  it('Deve lançar erro 400 se o turma_id não for fornecido', async () => {
    await expect(getAllClassesByTurma(null))
      .rejects.toMatchObject({ status: 400, message: 'O ID da turma é obrigatório.' });
  });
});