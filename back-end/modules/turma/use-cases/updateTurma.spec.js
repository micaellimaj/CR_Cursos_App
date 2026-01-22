const updateTurma = require('./updateTurma');
const turmaService = require('../turmaService');
const cursoService = require('../../curso/cursoService');

jest.mock('../turmaService');
jest.mock('../../curso/cursoService');

describe('Unit Test: updateTurma', () => {
  beforeEach(() => jest.clearAllMocks());

  it('Deve lançar erro 404 se a turma não existir', async () => {
    turmaService.getTurmaPorId.mockResolvedValue(null);
    await expect(updateTurma('ID_FALSO', { nome: 'Novo Nome' }))
      .rejects.toMatchObject({ status: 404, message: 'Turma não encontrada.' });
  });

  it('Deve validar se o novo curso_id existe ao tentar atualizar', async () => {
    turmaService.getTurmaPorId.mockResolvedValue({ id: 'T1' });
    cursoService.findById.mockResolvedValue(null);

    await expect(updateTurma('T1', { curso_id: 'CURSO_INVALIDO' }))
      .rejects.toMatchObject({ status: 404, message: 'Novo curso não encontrado.' });
  });

  it('Deve validar a consistência das datas durante o update', async () => {
    turmaService.getTurmaPorId.mockResolvedValue({ 
      id: 'T1', 
      data_inicio: '2026-01-01', 
      data_fim: '2026-12-01' 
    });

    await expect(updateTurma('T1', { data_fim: '2025-01-01' }))
      .rejects.toMatchObject({ status: 400, message: 'A data de início deve ser anterior à data de fim.' });
  });

  it('Deve atualizar a turma com sucesso', async () => {
    turmaService.getTurmaPorId.mockResolvedValue({ id: 'T1', data_inicio: '2026-01-01' });
    turmaService.atualizarTurma.mockResolvedValue(true);

    const resultado = await updateTurma('T1', { nome: 'Turma Renovada' });

    expect(resultado.message).toBe('Turma atualizada com sucesso.');
    expect(turmaService.atualizarTurma).toHaveBeenCalled();
  });
});