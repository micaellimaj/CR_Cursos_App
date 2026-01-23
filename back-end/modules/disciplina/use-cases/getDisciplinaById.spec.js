const getDisciplinaById = require('./getDisciplinaById');
const disciplinaService = require('../disciplinaService');

jest.mock('../disciplinaService');

describe('Unit Test: getDisciplinaById', () => {
  it('Deve retornar uma disciplina formatada se o ID existir', async () => {
    const mockDados = { nome: 'Banco de Dados', cursoId: 'C1', professorId: 'P1' };
    disciplinaService.findById.mockResolvedValue(mockDados);

    const resultado = await getDisciplinaById('DIS-123');

    expect(resultado).toEqual(expect.objectContaining({
      id: 'DIS-123',
      nome: 'Banco de Dados',
      turmasAssociadas: []
    }));
  });

  it('Deve lançar erro 404 se a disciplina não for encontrada', async () => {
    disciplinaService.findById.mockResolvedValue(null);

    await expect(getDisciplinaById('ID-FALSO'))
      .rejects.toMatchObject({ status: 404, message: 'Disciplina não encontrada.' });
  });

  it('Deve lançar erro 400 se o ID não for enviado', async () => {
    await expect(getDisciplinaById(null))
      .rejects.toMatchObject({ status: 400, message: 'ID não informado.' });
  });
});