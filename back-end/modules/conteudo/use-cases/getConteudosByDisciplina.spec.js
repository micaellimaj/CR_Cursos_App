const getConteudosByDisciplina = require('./getConteudosByDisciplina');
const conteudoService = require('../conteudoService');

jest.mock('../conteudoService');

describe('Unit Test: getConteudosByDisciplina', () => {
  const disciplinaId = 'DISC-99';

  it('Deve retornar um array de conteúdos para a disciplina informada', async () => {
    const mockRawData = {
      'ID-1': { id: 'ID-1', titulo: 'Aula 1', disciplinaId, tipo: 'link' },
      'ID-2': { id: 'ID-2', titulo: 'Aula 2', disciplinaId, tipo: 'link' }
    };

    conteudoService.getByDisciplina.mockResolvedValue(mockRawData);

    const resultado = await getConteudosByDisciplina(disciplinaId);

    expect(Array.isArray(resultado)).toBe(true);
    expect(resultado).toHaveLength(2);
    expect(resultado[0].id).toBe('ID-1');
  });

  it('Deve retornar um array vazio quando não houver conteúdos', async () => {
    conteudoService.getByDisciplina.mockResolvedValue(null);

    const resultado = await getConteudosByDisciplina(disciplinaId);

    expect(resultado).toEqual([]);
  });

  it('Deve lançar erro se o ID da disciplina não for fornecido', async () => {
    await expect(getConteudosByDisciplina(null))
      .rejects.toThrow("ID da disciplina é obrigatório.");
  });

});