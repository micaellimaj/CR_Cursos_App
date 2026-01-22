const getCursoById = require('./getCursoById');
const cursoService = require('../cursoService');

jest.mock('../cursoService');

describe('Unit Test: getCursoById', () => {
  it('Deve lançar erro 400 se o ID não for fornecido', async () => {
    await expect(getCursoById(null))
      .rejects.toMatchObject({ status: 400, message: 'O ID do Curso é obrigatório.' });
  });

  it('Deve lançar erro 404 se o curso não existir', async () => {
    cursoService.findById.mockResolvedValue(null);

    await expect(getCursoById('ID_FALSO'))
      .rejects.toMatchObject({ status: 404, message: 'Curso com ID ID_FALSO não encontrado.' });
  });

  it('Deve retornar o curso formatado quando o ID for válido', async () => {
    cursoService.findById.mockResolvedValue({ nome: 'Node.js Expert' });

    const resultado = await getCursoById('ID_REAL');

    expect(resultado).toMatchObject({
      id: 'ID_REAL',
      nome: 'Node.js Expert',
      collection: 'cursos'
    });
  });
});