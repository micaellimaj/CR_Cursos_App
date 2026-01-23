const validarPermissaoProfessor = require('./validarPermissaoProfessor');
const turmaService = require('../../turma/turmaService');
const disciplinaService = require('../../disciplina/disciplinaService');

jest.mock('../../turma/turmaService');
jest.mock('../../disciplina/disciplinaService');

describe('Unit Test: validarPermissaoProfessor', () => {
  
  const mockTurma = {
    id: 'T1',
    professores: { 'PROF-OK': true },
    alunos: { 'ALU-OK': true }
  };

  const mockDisciplina = {
    id: 'D1',
    professorId: 'PROF-OK'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve retornar true quando todas as condições forem atendidas', async () => {
    turmaService.getTurmaPorId.mockResolvedValue(mockTurma);
    disciplinaService.findById.mockResolvedValue(mockDisciplina);

    const resultado = await validarPermissaoProfessor('PROF-OK', 'T1', 'D1', 'ALU-OK');
    expect(resultado).toBe(true);
  });

  it('Deve lançar erro 403 se o professor não estiver vinculado à turma', async () => {
    turmaService.getTurmaPorId.mockResolvedValue(mockTurma);

    await expect(validarPermissaoProfessor('PROF-INTRUSO', 'T1', 'D1', 'ALU-OK'))
      .rejects.toMatchObject({ status: 403, message: "Este professor não tem permissão para esta turma." });
  });

  it('Deve lançar erro 403 se a disciplina pertencer a outro professor', async () => {
    turmaService.getTurmaPorId.mockResolvedValue(mockTurma);
    disciplinaService.findById.mockResolvedValue({ ...mockDisciplina, professorId: 'OUTRO-PROF' });

    await expect(validarPermissaoProfessor('PROF-OK', 'T1', 'D1', 'ALU-OK'))
      .rejects.toMatchObject({ status: 403, message: "Este professor não é o responsável por esta disciplina." });
  });

  it('Deve lançar erro 400 se o aluno não pertencer à turma informada', async () => {
    turmaService.getTurmaPorId.mockResolvedValue(mockTurma);
    disciplinaService.findById.mockResolvedValue(mockDisciplina);

    await expect(validarPermissaoProfessor('PROF-OK', 'T1', 'D1', 'ALU-FALSO'))
      .rejects.toMatchObject({ status: 400, message: "O aluno informado não pertence a esta turma." });
  });
});