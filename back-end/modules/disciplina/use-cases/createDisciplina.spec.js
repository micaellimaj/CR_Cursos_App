const createDisciplina = require('./createDisciplina');
const disciplinaService = require('../disciplinaService');
const { validarDadosDisciplina } = require('../types/disciplinaSchema');

jest.mock('../disciplinaService');
jest.mock('../types/disciplinaSchema');
jest.mock('../utils/gerarIdDisciplina', () => () => 'DIS-123456');

describe('Unit Test: createDisciplina', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve criar uma disciplina com sucesso (Caminho Feliz)', async () => {
    disciplinaService.create.mockResolvedValue('DIS-123456');

    const dadosValidos = {
      nome: 'Estrutura de Dados',
      cursoId: 'CURSO-ADS',
      professorId: 'PROF-99'
    };

    const resultado = await createDisciplina(dadosValidos);

    expect(resultado).toEqual(expect.objectContaining({
      id: 'DIS-123456',
      message: 'Disciplina criada com sucesso!',
      data: expect.objectContaining({
        nome: 'Estrutura de Dados',
        cursoId: 'CURSO-ADS',
        professorId: 'PROF-99',
        turmasAssociadas: []
      })
    }));

    expect(disciplinaService.create).toHaveBeenCalledWith(
      'DIS-123456',
      expect.objectContaining({ nome: 'Estrutura de Dados' })
    );
  });

  it('Deve lançar erro de validação quando campos obrigatórios faltarem', async () => {
    validarDadosDisciplina.mockImplementation(() => {
      throw { status: 400, message: 'Campos obrigatórios faltando: nome, cursoId e professorId.' };
    });

    const dadosIncompletos = { nome: 'Só o nome' };

    try {
      await createDisciplina(dadosIncompletos);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toContain('Campos obrigatórios faltando');
    }
  });

  it('Deve garantir que turmasAssociadas seja inicializado como array vazio se não enviado', async () => {
    disciplinaService.create.mockResolvedValue('DIS-123456');

    const dados = { nome: 'Lógica', cursoId: 'C1', professorId: 'P1' };
    const resultado = await createDisciplina(dados);

    expect(resultado.data.turmasAssociadas).toEqual([]);
    expect(Array.isArray(resultado.data.turmasAssociadas)).toBe(true);
  });
});