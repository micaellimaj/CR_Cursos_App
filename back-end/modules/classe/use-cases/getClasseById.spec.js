const getClasseById = require('./getClasseById');
const classeService = require('../classeService');

jest.mock('../classeService');

describe('Unit Test: getClasseById', () => {
  it('Deve retornar os dados da classe quando o ID for encontrado', async () => {
    const mockClasse = { id: 'CLS-1', titulo: 'Aula de Português', turma_id: 'T1' };
    classeService.getClasseById.mockResolvedValue(mockClasse);

    const resultado = await getClasseById('CLS-1');

    expect(resultado).toEqual(mockClasse);
    expect(classeService.getClasseById).toHaveBeenCalledWith('CLS-1');
  });

  it('Deve lançar erro 404 quando a classe não existir', async () => {
    classeService.getClasseById.mockResolvedValue(null);

    await expect(getClasseById('ID-INEXISTENTE'))
      .rejects.toMatchObject({ status: 404, message: 'Conteúdo não encontrado.' });
  });
});