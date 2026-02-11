const deleteClasse = require('./deleteClasse');
const classeService = require('../classeService');

jest.mock('../classeService');

describe('Unit Test: deleteClasse', () => {
  beforeEach(() => jest.clearAllMocks());

  it('Deve remover a classe com sucesso quando o ID existe', async () => {
    classeService.getClasseById.mockResolvedValue({ id: 'CLS-123', titulo: 'Aula' });
    classeService.deletarClasse.mockResolvedValue(true);

    const resultado = await deleteClasse('CLS-123');

    expect(classeService.deletarClasse).toHaveBeenCalledWith('CLS-123');
    expect(resultado.message).toBe('Postagem removida com sucesso');
  });

  it('Deve lançar erro 404 se a postagem não existir', async () => {
    classeService.getClasseById.mockResolvedValue(null);

    await expect(deleteClasse('ID-FALSO'))
      .rejects.toMatchObject({ 
        status: 404, 
        message: 'Postagem não encontrada para exclusão.' 
      });
    
    expect(classeService.deletarClasse).not.toHaveBeenCalled();
  });
});