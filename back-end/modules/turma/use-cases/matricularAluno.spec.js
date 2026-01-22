const matricularAluno = require('./matricularAluno');
const turmaService = require('../turmaService');
const alunoService = require('../../aluno/alunoService');

jest.mock('../turmaService');
jest.mock('../../aluno/alunoService');

describe('Unit Test: matricularAluno', () => {
  beforeEach(() => jest.clearAllMocks());

  it('Deve lançar erro 404 se o aluno ou turma não existirem', async () => {
    alunoService.getAlunoPorId.mockResolvedValue(null);
    turmaService.getTurmaPorId.mockResolvedValue({ nome: 'Turma Teste' });

    await expect(matricularAluno({ alunoId: 'ALUNO_FAKE', turmaId: 'T1' }))
      .rejects.toMatchObject({ status: 404, message: 'Aluno não encontrado.' });
  });

  it('Deve realizar a matrícula com sucesso e atualizar aluno e turma', async () => {
    alunoService.getAlunoPorId.mockResolvedValue({ full_name: 'Linus Torvalds' });
    turmaService.getTurmaPorId.mockResolvedValue({ nome: 'Sistemas Operacionais', alunos: {} });

    const resultado = await matricularAluno({ alunoId: 'ALUNO_789', turmaId: 'T3' });

    expect(resultado).toEqual({
      message: 'Matrícula realizada com sucesso.',
      aluno: 'Linus Torvalds',
      turma: 'Sistemas Operacionais'
    });

    expect(turmaService.adicionarAluno).toHaveBeenCalledWith('T3', 'ALUNO_789');
    expect(alunoService.adicionarTurmaAoAluno).toHaveBeenCalledWith('ALUNO_789', 'T3');
  });
});