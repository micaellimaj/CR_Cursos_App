const createCurso = require('./createCurso');
const cursoService = require('../cursoService');
const { validarDadosCurso } = require('../types/cursoSchema');

jest.mock('../cursoService');
jest.mock('../types/cursoSchema');
jest.mock('../utils/gerarIdCurso', () => () => 'CURSO-123456');

describe('Unit Test: createCurso', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve lançar erro se o nome do curso não for enviado (validação do schema)', async () => {
    validarDadosCurso.mockImplementation(() => {
      throw { status: 400, message: 'O nome do curso é obrigatório.' };
    });

    await expect(createCurso({}))
      .rejects.toMatchObject({ status: 400, message: 'O nome do curso é obrigatório.' });
  });

  it('Deve lançar erro se já existir um curso com o mesmo nome', async () => {
    cursoService.findByNome.mockResolvedValue({ id: 'EXISTENTE', nome: 'Node.js' });

    const dados = { nome: 'Node.js' };

    await expect(createCurso(dados))
      .rejects.toMatchObject({ status: 400, message: 'Já existe um curso cadastrado com este nome.' });
  });

  it('Deve criar o curso com sucesso (Caminho Feliz)', async () => {
    cursoService.findByNome.mockResolvedValue(null);
    cursoService.create.mockResolvedValue('CURSO-123456');

    const dados = {
      nome: 'Desenvolvimento Web',
      descricao: 'Curso Fullstack'
    };

    const resultado = await createCurso(dados);

    expect(resultado).toEqual({
      id: 'CURSO-123456',
      message: 'Curso criado com sucesso'
    });
    
    expect(cursoService.create).toHaveBeenCalledWith('CURSO-123456', expect.objectContaining({
      nome: 'Desenvolvimento Web',
      id: 'CURSO-123456'
    }));
  });
});