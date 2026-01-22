const getAlunosDaTurma = require('./getAlunosDaTurma');
const turmaService = require('../turmaService');
const alunoService = require('../../aluno/alunoService');

jest.mock('../turmaService');
jest.mock('../../aluno/alunoService');

describe('Unit Test: getAlunosDaTurma', () => {
  it('Deve retornar lista vazia se a turma não tiver alunos', async () => {
    turmaService.getTurmaPorId.mockResolvedValue({ id: 'T1', alunos: null });

    const resultado = await getAlunosDaTurma('T1');
    expect(resultado).toEqual([]);
  });

  it('Deve retornar detalhes dos alunos sem o campo senha', async () => {
    turmaService.getTurmaPorId.mockResolvedValue({ 
      id: 'T1', 
      alunos: { 'A1': true, 'A2': true } 
    });

    alunoService.getAlunoPorId.mockImplementation(async (id) => {
      return { full_name: `Aluno ${id}`, senha: '123' };
    });

    const resultado = await getAlunosDaTurma('T1');

    expect(resultado).toHaveLength(2);
    expect(resultado[0]).not.toHaveProperty('senha');
    expect(resultado[0].full_name).toBe('Aluno A1');
  });
});