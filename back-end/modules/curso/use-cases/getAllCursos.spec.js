const getAllCursos = require('./getAllCursos');
const cursoService = require('../cursoService');

jest.mock('../cursoService');

describe('Unit Test: getAllCursos', () => {
  it('Deve retornar uma lista de cursos formatada (JSON)', async () => {
    const mockCursos = [
      { id: '1', nome: 'Curso A' },
      { id: '2', nome: 'Curso B' }
    ];
    
    cursoService.findAll.mockResolvedValue(mockCursos);

    const resultado = await getAllCursos();

    expect(resultado).toHaveLength(2);
    expect(resultado[0]).toHaveProperty('collection', 'cursos');
    expect(resultado[1].nome).toBe('Curso B');
  });

  it('Deve retornar lista vazia se não houver cursos', async () => {
    cursoService.findAll.mockResolvedValue([]);
    const resultado = await getAllCursos();
    expect(resultado).toEqual([]);
  });
});