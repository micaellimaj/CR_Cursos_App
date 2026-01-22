const createTurma = require('./createTurma');
const turmaService = require('../turmaService');
const cursoService = require('../../curso/cursoService');
const { validarDadosTurma } = require('../types/turmaSchema');

jest.mock('../turmaService');
jest.mock('../../curso/cursoService');
jest.mock('../types/turmaSchema');
jest.mock('../utils/gerarIdTurma', () => () => 'TURMA-123456');

describe('Unit Test: createTurma', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve lançar erro se o curso vinculado não existir', async () => {
    cursoService.findById.mockResolvedValue(null);
    
    const dados = { curso_id: 'ID_INEXISTENTE', nome: 'Turma A' };

    await expect(createTurma(dados))
      .rejects.toMatchObject({ 
        status: 404, 
        message: 'Curso com ID ID_INEXISTENTE não encontrado.' 
      });
  });

  it('Deve lançar erro se a data de início for posterior à data de fim', async () => {
    cursoService.findById.mockResolvedValue({ id: 'C1', nome: 'Curso Teste' });

    const dados = {
      curso_id: 'C1',
      nome: 'Turma Errada',
      data_inicio: '2026-12-31',
      data_fim: '2026-01-01'
    };

    await expect(createTurma(dados))
      .rejects.toMatchObject({ 
        status: 400, 
        message: 'A data de início deve ser anterior à data de fim.' 
      });
  });

  it('Deve criar a turma com sucesso (Caminho Feliz)', async () => {
    cursoService.findById.mockResolvedValue({ id: 'C1', nome: 'Engenharia' });
    turmaService.criarTurma.mockResolvedValue('TURMA-123456');

    const dados = {
      curso_id: 'C1',
      nome: 'Turma 2026.1',
      data_inicio: '2026-02-01',
      data_fim: '2026-06-30'
    };

    const resultado = await createTurma(dados);

    expect(resultado).toEqual({
      id: 'TURMA-123456',
      nome: 'Turma 2026.1',
      curso: 'Engenharia',
      message: 'Turma criada com sucesso'
    });

    expect(turmaService.criarTurma).toHaveBeenCalledWith(
      'TURMA-123456', 
      expect.objectContaining({ nome: 'Turma 2026.1' })
    );
  });
});