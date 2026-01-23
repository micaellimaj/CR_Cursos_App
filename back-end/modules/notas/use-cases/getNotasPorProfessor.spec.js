const getNotasPorProfessor = require('./getNotasPorProfessor');
const notaService = require('../notaService');

jest.mock('../notaService');

describe('Unit Test: getNotasPorProfessor', () => {
  it('Deve retornar lista de notas para um professor específico', async () => {
    const mockNotas = [
      { id: 'N1', professorId: 'PROF-01', valor: 10 },
      { id: 'N2', professorId: 'PROF-01', valor: 5 }
    ];
    notaService.findByProfessor.mockResolvedValue(mockNotas);

    const resultado = await getNotasPorProfessor('PROF-01');

    expect(Array.isArray(resultado)).toBe(true);
    expect(resultado.length).toBe(2);
    expect(notaService.findByProfessor).toHaveBeenCalledWith('PROF-01');
    expect(resultado[0]).not.toHaveProperty('collection');
  });

  it('Deve lançar erro 400 se professorId for omitido', async () => {
    await expect(getNotasPorProfessor(null))
      .rejects.toMatchObject({ status: 400, message: "ID do professor é obrigatório." });
  });
});