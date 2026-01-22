const getTurmaById = require('./getTurmaById');
const turmaService = require('../turmaService');

jest.mock('../turmaService');

describe('Unit Test: getTurmaById', () => {
  it('Deve lançar erro 404 se a turma não existir', async () => {
    turmaService.getTurmaPorId.mockResolvedValue(null);

    await expect(getTurmaById('NAO_EXISTE'))
      .rejects.toMatchObject({ status: 404 });
  });

  it('Deve retornar a turma formatada para um ID válido', async () => {
    turmaService.getTurmaPorId.mockResolvedValue({ nome: 'Turma de Teste' });

    const resultado = await getTurmaById('T_123');

    expect(resultado).toMatchObject({
      id: 'T_123',
      nome: 'Turma de Teste',
      collection: 'turmas'
    });
  });
});