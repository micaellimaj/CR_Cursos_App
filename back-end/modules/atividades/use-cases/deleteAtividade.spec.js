const deleteAtividade = require('./deleteAtividade');
const atividadeService = require('../atividadeService');

jest.mock('../atividadeService');

describe('Unit Test: deleteAtividade', () => {
  beforeEach(() => jest.clearAllMocks());

  it('Deve remover a atividade e o arquivo do storage com sucesso', async () => {
    const mockAtividade = { id: 'ATIV-1', urlArquivo: 'http://link.com/file.pdf' };
    atividadeService.getById.mockResolvedValue(mockAtividade);
    atividadeService.deleteFromStorage.mockResolvedValue(true);
    atividadeService.delete.mockResolvedValue(true);

    const resultado = await deleteAtividade('ATIV-1');

    expect(atividadeService.deleteFromStorage).toHaveBeenCalledWith(mockAtividade.urlArquivo);
    expect(atividadeService.delete).toHaveBeenCalledWith('ATIV-1');
    expect(resultado.message).toBe("Atividade removida com sucesso!");
  });

  it('Deve lançar erro 404 se a atividade não existir', async () => {
    atividadeService.getById.mockResolvedValue(null);

    await expect(deleteAtividade('ID-FALSO'))
      .rejects.toMatchObject({ status: 404, message: "Atividade não encontrada." });
  });
});