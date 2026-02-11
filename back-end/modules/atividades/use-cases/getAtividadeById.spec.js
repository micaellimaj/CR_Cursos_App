const getAtividadeById = require('./getAtividadeById');
const atividadeService = require('../atividadeService');

jest.mock('../atividadeService');

describe('Unit Test: getAtividadeById', () => {
  it('Deve retornar uma atividade formatada quando o ID existir', async () => {
    const mockData = { titulo: 'Atividade 1', disciplinaId: 'DISC-01', tipo: 'texto' };
    atividadeService.getById.mockResolvedValue(mockData);

    const resultado = await getAtividadeById('ID-123');

    expect(resultado.id).toBe('ID-123');
    expect(resultado.titulo).toBe('Atividade 1');
    expect(atividadeService.getById).toHaveBeenCalledWith('ID-123');
  });

  it('Deve lançar erro 404 quando a atividade não existir', async () => {
    atividadeService.getById.mockResolvedValue(null);

    await expect(getAtividadeById('ID-INVALIDO'))
      .rejects.toMatchObject({ status: 404, message: "Atividade não encontrada." });
  });
});