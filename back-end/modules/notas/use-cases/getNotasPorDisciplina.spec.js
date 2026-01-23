const getNotasPorDisciplina = require('./getNotasPorDisciplina');
const notaService = require('../notaService');

jest.mock('../notaService');

describe('Unit Test: getNotasPorDisciplina', () => {
  
  it('Deve retornar as notas vinculadas a uma disciplina específica', async () => {
    const mockNotas = [
      { id: 'N1', valor: 7, disciplinaId: 'DIS-10' }
    ];
    notaService.findByDisciplina.mockResolvedValue(mockNotas);

    const resultado = await getNotasPorDisciplina('DIS-10');

    expect(resultado[0].disciplinaId).toBe('DIS-10');
    expect(notaService.findByDisciplina).toHaveBeenCalledWith('DIS-10');
  });

  it('Deve lançar erro 400 se o disciplinaId estiver ausente', async () => {
    await expect(getNotasPorDisciplina(""))
      .rejects.toMatchObject({ status: 400, message: /ID da disciplina é obrigatório/ });
  });
});