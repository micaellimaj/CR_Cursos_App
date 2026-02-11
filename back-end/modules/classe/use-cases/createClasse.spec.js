const createClasse = require('./createClasse');
const classeService = require('../classeService');
const turmaService = require('../../turma/turmaService');

jest.mock('../classeService');
jest.mock('../../turma/turmaService');
jest.mock('../utils/gerarIdClasse', () => () => 'CLASS-999');

describe('Unit Test: createClasse', () => {
  const dadosValidos = {
    turma_id: 'TURMA-01',
    professor_id: 'PROF-123',
    titulo: 'Aula de Álgebra',
    tipo: 'material',
    anexos: []
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve criar uma classe com sucesso quando a turma existir', async () => {
    turmaService.getTurmaById.mockResolvedValue({ id: 'TURMA-01', nome: '9º Ano A' });
    classeService.criarClasse.mockResolvedValue('CLASS-999');

    const resultado = await createClasse(dadosValidos);

    expect(resultado.message).toBe('Postagem de classe criada com sucesso');
    expect(resultado.turma).toBe('9º Ano A');
    expect(classeService.criarClasse).toHaveBeenCalled();
  });

  it('Deve lançar erro 404 se a turma não for encontrada', async () => {
    turmaService.getTurmaById.mockResolvedValue(null);

    await expect(createClasse(dadosValidos))
      .rejects.toMatchObject({ status: 404, message: /não encontrada/ });
    
    expect(classeService.criarClasse).not.toHaveBeenCalled();
  });

  it('Deve falhar se faltar campos obrigatórios no schema', async () => {
    const dadosIncompletos = { titulo: 'Sem Turma ID' };

    await expect(createClasse(dadosIncompletos))
      .rejects.toMatchObject({ status: 400 });
  });
});