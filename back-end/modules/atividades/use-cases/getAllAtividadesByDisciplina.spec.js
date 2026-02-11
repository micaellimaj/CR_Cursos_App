const getAllAtividadesByDisciplina = require('./getAllAtividadesByDisciplina');
const atividadeService = require('../atividadeService');

jest.mock('../atividadeService');

describe('Unit Test: getAllAtividadesByDisciplina', () => {
  it('Deve retornar uma lista de atividades formatadas', async () => {
    const mockFirebaseData = {
      'ID-1': { titulo: 'Ativ 1', tipo: 'texto' },
      'ID-2': { titulo: 'Ativ 2', tipo: 'pdf' }
    };
    atividadeService.getAllByDisciplina.mockResolvedValue(mockFirebaseData);

    const resultado = await getAllAtividadesByDisciplina('DISC-101');

    expect(Array.isArray(resultado)).toBe(true);
    expect(resultado.length).toBe(2);
    expect(resultado[0].id).toBe('ID-1');
    expect(resultado[1].titulo).toBe('Ativ 2');
  });

  it('Deve retornar array vazio se não houver atividades', async () => {
    atividadeService.getAllByDisciplina.mockResolvedValue(null);

    const resultado = await getAllAtividadesByDisciplina('DISC-VAZIA');

    expect(resultado).toEqual([]);
  });
});