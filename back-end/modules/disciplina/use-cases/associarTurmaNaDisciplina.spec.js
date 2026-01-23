const associarTurmaNaDisciplina = require('./associarTurmaNaDisciplina');
const disciplinaService = require('../disciplinaService');
const turmaService = require('../../turma/turmaService');

jest.mock('../disciplinaService');
jest.mock('../../turma/turmaService');

describe('Unit Test: associarTurmaNaDisciplina', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve associar com sucesso quando o professor é o dono da disciplina', async () => {
    const mockDisciplina = { id: 'D1', professorId: 'PROF-AUTO', turmasAssociadas: [] };
    const mockTurma = { id: 'T1', nome: 'Turma 2026' };

    disciplinaService.findById.mockResolvedValue(mockDisciplina);
    turmaService.getTurmaPorId.mockResolvedValue(mockTurma);

    const resultado = await associarTurmaNaDisciplina({
      disciplinaId: 'D1',
      turmaId: 'T1',
      professorId: 'PROF-AUTO'
    });

    expect(resultado.message).toBe("Turma associada à disciplina com sucesso!");
    expect(disciplinaService.update).toHaveBeenCalledWith('D1', {
      turmasAssociadas: ['T1']
    });
  });

  it('Deve lançar erro 403 se o professor não estiver vinculado nem à disciplina nem à turma', async () => {
    const mockDisciplina = { id: 'D1', professorId: 'PROF-A', turmasAssociadas: [] };
    const mockTurma = { id: 'T1', professor_principal_id: 'PROF-B' };

    disciplinaService.findById.mockResolvedValue(mockDisciplina);
    turmaService.getTurmaPorId.mockResolvedValue(mockTurma);

    await expect(associarTurmaNaDisciplina({
      disciplinaId: 'D1',
      turmaId: 'T1',
      professorId: 'PROF-INTRUSO'
    })).rejects.toMatchObject({ status: 403, message: "Professor não autorizado para esta operação." });
  });

  it('Deve lançar erro 400 se a turma já estiver associada', async () => {
    const mockDisciplina = { id: 'D1', professorId: 'P1', turmasAssociadas: ['T1'] };
    const mockTurma = { id: 'T1' };

    disciplinaService.findById.mockResolvedValue(mockDisciplina);
    turmaService.getTurmaPorId.mockResolvedValue(mockTurma);

    await expect(associarTurmaNaDisciplina({
      disciplinaId: 'D1',
      turmaId: 'T1',
      professorId: 'P1'
    })).rejects.toMatchObject({ status: 400, message: "Turma já está associada a esta disciplina." });
  });

  it('Deve lançar erro 404 se a disciplina ou turma não existirem', async () => {
    disciplinaService.findById.mockResolvedValue(null);
    turmaService.getTurmaPorId.mockResolvedValue({ id: 'T1' });

    await expect(associarTurmaNaDisciplina({
      disciplinaId: 'D-INVALIDA',
      turmaId: 'T1',
      professorId: 'P1'
    })).rejects.toMatchObject({ status: 404, message: "Disciplina não encontrada." });
  });
});