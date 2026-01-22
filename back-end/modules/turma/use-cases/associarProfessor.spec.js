const associarProfessor = require('./associarProfessor');
const turmaService = require('../turmaService');
const professorService = require('../../professor/professorService');

jest.mock('../turmaService');
jest.mock('../../professor/professorService');

describe('Unit Test: associarProfessor', () => {
  beforeEach(() => jest.clearAllMocks());

  it('Deve lançar erro se o professor já estiver na turma', async () => {
    professorService.getProfessorByIdService.mockResolvedValue({ full_name: 'Alan Turing' });
    turmaService.getTurmaPorId.mockResolvedValue({ 
      nome: 'Turma A', 
      professores: { 'PROF_123': true } 
    });

    await expect(associarProfessor({ professorId: 'PROF_123', turmaId: 'T1' }))
      .rejects.toMatchObject({ 
        status: 400, 
        message: 'O Professor Alan Turing já está nesta turma.' 
      });
  });

  it('Deve associar o professor com sucesso e atualizar ambos os serviços', async () => {
    professorService.getProfessorByIdService.mockResolvedValue({ full_name: 'Grace Hopper' });
    turmaService.getTurmaPorId.mockResolvedValue({ nome: 'Computação', professores: {} });

    const resultado = await associarProfessor({ professorId: 'PROF_456', turmaId: 'T2' });

    expect(resultado.message).toBe('Professor associado com sucesso.');
    expect(turmaService.adicionarProfessor).toHaveBeenCalledWith('T2', 'PROF_456');
    expect(professorService.adicionarTurmaAoProfessor).toHaveBeenCalledWith('PROF_456', 'T2');
  });
});