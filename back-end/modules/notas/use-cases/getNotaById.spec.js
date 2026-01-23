const getNotaById = require('./getNotaById');
const notaService = require('../notaService');

jest.mock('../notaService');

describe('Unit Test: getNotaById', () => {
  
  it('Deve buscar e formatar a nota corretamente', async () => {
    const mockDadosBanco = {
      alunoId: 'A1',
      valor: 9.0,
      professorId: 'P1'
    };
    notaService.findById.mockResolvedValue(mockDadosBanco);

    const resultado = await getNotaById('NOT-123');

    expect(resultado).toEqual(expect.objectContaining({
      id: 'NOT-123',
      valor: 9.0
    }));
    expect(resultado.collection).toBeUndefined();
  });

  it('Deve lançar 404 para nota inexistente', async () => {
    notaService.findById.mockResolvedValue(null);

    await expect(getNotaById('ID-INEXISTENTE'))
      .rejects.toMatchObject({ status: 404, message: "Nota não encontrada." });
  });

  it('Deve lançar 400 se o ID for nulo ou vazio', async () => {
    await expect(getNotaById(""))
      .rejects.toMatchObject({ status: 400, message: "ID da nota não informado." });
  });
});