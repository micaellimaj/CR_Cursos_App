const deleteConteudo = require('./deleteConteudo');
const conteudoService = require('../conteudoService');

jest.mock('../conteudoService');

describe('Unit Test: deleteConteudo', () => {
  const mockId = 'CONT-123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve remover conteúdo e arquivo do storage se for do tipo arquivo', async () => {
    const mockData = { 
      id: mockId, 
      tipo: 'arquivo', 
      url: 'https://storage.com/arquivo.pdf' 
    };

    conteudoService.getById.mockResolvedValue(mockData);
    conteudoService.deleteFromStorage.mockResolvedValue(true);
    conteudoService.delete.mockResolvedValue(true);

    const resultado = await deleteConteudo(mockId);

    expect(conteudoService.deleteFromStorage).toHaveBeenCalledWith(mockData.url);
    expect(conteudoService.delete).toHaveBeenCalledWith(mockId);
    expect(resultado.message).toBe("Conteúdo removido com sucesso!");
  });

  it('Deve remover apenas do banco se não for tipo arquivo', async () => {
    const mockData = { id: mockId, tipo: 'texto', valor: 'Ola' };

    conteudoService.getById.mockResolvedValue(mockData);
    
    await deleteConteudo(mockId);

    expect(conteudoService.deleteFromStorage).not.toHaveBeenCalled();
    expect(conteudoService.delete).toHaveBeenCalledWith(mockId);
  });

  it('Deve lançar erro se o conteúdo não existir', async () => {
    conteudoService.getById.mockResolvedValue(null);

    await expect(deleteConteudo('ID-FAKE'))
      .rejects.toThrow("Conteúdo não encontrado.");
  });
});