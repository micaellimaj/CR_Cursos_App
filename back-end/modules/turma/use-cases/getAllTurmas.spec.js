const getAllTurmas = require('./getAllTurmas');
const turmaService = require('../turmaService');

jest.mock('../turmaService');

describe('Unit Test: getAllTurmas', () => {
  it('Deve retornar uma lista de turmas instanciadas corretamente', async () => {
    const mockTurmas = [
      { id: 'T1', nome: 'Turma 01' },
      { id: 'T2', nome: 'Turma 02' }
    ];
    turmaService.getTodasTurmas.mockResolvedValue(mockTurmas);

    const resultado = await getAllTurmas();

    expect(resultado).toHaveLength(2);
    expect(resultado[0]).toHaveProperty('collection', 'turmas');
    expect(resultado[0].id).toBe('T1');
  });
});