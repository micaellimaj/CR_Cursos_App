const deleteTurma = require('./deleteTurma');
const turmaService = require('../turmaService');

jest.mock('../turmaService');

describe('Unit Test: deleteTurma', () => {
  beforeEach(() => jest.clearAllMocks());

  it('Deve lançar erro 404 se tentar deletar turma inexistente', async () => {
    turmaService.getTurmaPorId.mockResolvedValue(null);

    await expect(deleteTurma('ID_INVALIDO'))
      .rejects.toMatchObject({ status: 404 });
  });

  it('Deve deletar com sucesso se a turma existir', async () => {
    turmaService.getTurmaPorId.mockResolvedValue({ id: 'T1' });
    turmaService.deletarTurma.mockResolvedValue(true);

    const resultado = await deleteTurma('T1');

    expect(resultado.message).toBe('Turma excluída com sucesso.');
    expect(turmaService.deletarTurma).toHaveBeenCalledWith('T1');
  });
});