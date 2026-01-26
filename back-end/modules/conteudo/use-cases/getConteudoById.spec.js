const getConteudoById = require('./getConteudoById');
const conteudoService = require('../conteudoService');

jest.mock('../conteudoService');

describe('Unit Test: getConteudoById', () => {
  const mockId = 'CONT-001';

  it('Deve retornar o conteúdo formatado quando o ID existir', async () => {
    const mockData = {
      id: mockId,
      titulo: 'Aula de Teste',
      disciplinaId: 'DISC-1',
      tipo: 'texto',
      valor: 'Conteúdo mock'
    };

    conteudoService.getById.mockResolvedValue(mockData);

    const resultado = await getConteudoById(mockId);

    expect(resultado.id).toBe(mockId);
    expect(resultado).toHaveProperty('titulo', 'Aula de Teste');
    expect(conteudoService.getById).toHaveBeenCalledWith(mockId);
  });

  it('Deve lançar erro quando o conteúdo não for encontrado', async () => {
    conteudoService.getById.mockResolvedValue(null);

    await expect(getConteudoById('ID-INVALIDO'))
      .rejects.toThrow("Conteúdo não encontrado.");
  });
});