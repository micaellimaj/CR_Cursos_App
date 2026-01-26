const registrarChamada = require('./registrarChamada');
const frequenciaService = require('../frequenciaService');

jest.mock('../frequenciaService');
jest.mock('../../aluno/utils/gerarIdPersonalizado', () => () => 'FREQ-123');

describe('Unit Test: registrarChamada', () => {
  
  const payloadValido = {
    turma_id: 'TURMA-1',
    disciplina_id: 'DIS-1',
    professor_id: 'PROF-1',
    data: '25/10/2024',
    alunos: [
      { aluno_id: 'ALU-1', status: true },
      { aluno_id: 'ALU-2', status: false }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve registrar a chamada para múltiplos alunos com sucesso', async () => {
    frequenciaService.registrarFrequencias.mockResolvedValue(true);

    const resultado = await registrarChamada(payloadValido);

    expect(resultado.message).toBe('Chamada registrada com sucesso!');
    expect(frequenciaService.registrarFrequencias).toHaveBeenCalledWith(
      expect.objectContaining({
        'frequencias/FREQ-123': expect.any(Object)
      })
    );
  });

  it('Deve falhar se o status de um aluno não for booleano', async () => {
    const payloadInvalido = {
      ...payloadValido,
      alunos: [{ aluno_id: 'ALU-1', status: 'presente' }]
    };

    await expect(registrarChamada(payloadInvalido))
      .rejects.toMatchObject({ 
        status: 400, 
        message: 'O status da frequência deve ser um valor booleano (true para presença ou false para falta).' 
      });
  });

  it('Deve falhar se faltar campo obrigatório (ex: data)', async () => {
    const { data, ...incompleto } = payloadValido;

    await expect(registrarChamada(incompleto))
      .rejects.toMatchObject({ 
        status: 400 
      });
  });
});