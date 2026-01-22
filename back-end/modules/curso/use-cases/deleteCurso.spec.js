const deleteCurso = require('./deleteCurso');
const cursoService = require('../cursoService');
const turmaService = require('../../turma/turmaService');

jest.mock('../cursoService');
jest.mock('../../turma/turmaService');

describe('Unit Test: deleteCurso', () => {
  beforeEach(() => jest.clearAllMocks());

  it('Deve lançar erro 404 se o curso não existir', async () => {
    cursoService.findById.mockResolvedValue(null);

    await expect(deleteCurso('ID_INVALIDO'))
      .rejects.toMatchObject({ status: 404 });
  });

  it('Deve impedir a exclusão se houver turmas vinculadas ao curso', async () => {
    cursoService.findById.mockResolvedValue({ id: 'C1', nome: 'Curso Bloqueado' });
    turmaService.getTurmasPorCursoId.mockResolvedValue([{ id: 'T1' }, { id: 'T2' }]);

    await expect(deleteCurso('C1'))
      .rejects.toMatchObject({ 
        status: 400, 
        message: expect.stringContaining('Existem 2 turma(s) vinculadas') 
      });
  });

  it('Deve deletar o curso com sucesso se não houver turmas vinculadas', async () => {
    cursoService.findById.mockResolvedValue({ id: 'C1' });
    turmaService.getTurmasPorCursoId.mockResolvedValue([]);
    cursoService.remove.mockResolvedValue(true);

    const resultado = await deleteCurso('C1');

    expect(resultado.message).toBe('Curso excluído com sucesso.');
    expect(cursoService.remove).toHaveBeenCalledWith('C1');
  });
});