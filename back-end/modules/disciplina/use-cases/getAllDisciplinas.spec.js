const getAllDisciplinas = require('./getAllDisciplinas');
const disciplinaService = require('../disciplinaService');

jest.mock('../disciplinaService');

describe('Unit Test: getAllDisciplinas', () => {
  it('Deve retornar uma lista de disciplinas formatadas pelo Model', async () => {
    const mockLista = [
      { id: 'DIS-1', nome: 'Matemática' },
      { id: 'DIS-2', nome: 'Física' }
    ];
    disciplinaService.findAll.mockResolvedValue(mockLista);

    const resultado = await getAllDisciplinas();

    expect(Array.isArray(resultado)).toBe(true);
    expect(resultado.length).toBe(2);
    expect(resultado[0]).toHaveProperty('turmasAssociadas');
  });

  it('Deve retornar array vazio se o service retornar vazio', async () => {
    disciplinaService.findAll.mockResolvedValue([]);
    const resultado = await getAllDisciplinas();
    expect(resultado).toEqual([]);
  });
});