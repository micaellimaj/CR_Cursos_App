const updateClasse = require('./updateClasse');
const classeService = require('../classeService');

jest.mock('../classeService');

describe('Unit Test: updateClasse', () => {
  const mockExistente = { 
    id: 'CLS-1', 
    titulo: 'Título Original', 
    turma_id: 'T1',
    anexos: [] 
  };

  beforeEach(() => jest.clearAllMocks());

  it('Deve atualizar os dados e manter os campos originais não enviados', async () => {
    classeService.getClasseById.mockResolvedValue(mockExistente);
    classeService.atualizarClasse.mockResolvedValue(true);

    const novosDados = { titulo: 'Título Novo' };
    const resultado = await updateClasse('CLS-1', novosDados);

    expect(classeService.atualizarClasse).toHaveBeenCalledWith(
      'CLS-1',
      expect.objectContaining({
        titulo: 'Título Novo',
        turma_id: 'T1'
      })
    );
    expect(resultado.message).toBe('Conteúdo atualizado com sucesso');
  });

  it('Deve lançar erro 404 ao tentar atualizar classe inexistente', async () => {
    classeService.getClasseById.mockResolvedValue(null);

    await expect(updateClasse('ID-FALSO', { titulo: 'Erro' }))
      .rejects.toMatchObject({ status: 404, message: 'Postagem não encontrada.' });
  });
});