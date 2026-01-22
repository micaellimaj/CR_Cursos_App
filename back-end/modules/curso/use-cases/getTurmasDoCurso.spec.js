const getTurmasDoCurso = require('./getTurmasDoCurso');
const cursoService = require('../cursoService');
const turmaService = require('../../turma/turmaService');

jest.mock('../cursoService');
jest.mock('../../turma/turmaService');

describe('Unit Test: getTurmasDoCurso', () => {
  it('Deve lançar erro 404 se o curso não existir antes de buscar turmas', async () => {
    cursoService.findById.mockResolvedValue(null);

    await expect(getTurmasDoCurso('ID_INVALIDO'))
      .rejects.toMatchObject({ status: 404 });
  });

  it('Deve retornar a lista de turmas para um curso válido', async () => {
    cursoService.findById.mockResolvedValue({ nome: 'Curso de Testes' });
    const mockTurmas = [{ id: 'T1', nome: 'Turma Manhã' }, { id: 'T2', nome: 'Turma Noite' }];
    
    turmaService.getTurmasPorCursoId.mockResolvedValue(mockTurmas);

    const resultado = await getTurmasDoCurso('CURSO_ID');

    expect(resultado).toEqual(mockTurmas);
    expect(turmaService.getTurmasPorCursoId).toHaveBeenCalledWith('CURSO_ID');
  });
});