const createAtividade = require('./createAtividade');
const atividadeService = require('../atividadeService');

jest.mock('../atividadeService');
jest.mock('../utils/gerarIdAtividade', () => () => 'ATIV-123');

describe('Unit Test: createAtividade', () => {
  const dadosBase = {
    titulo: 'Trabalho de Geografia',
    disciplinaId: 'GEO-01',
    tipo: 'texto',
    descricao: 'Descreva o relevo brasileiro.'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve criar uma atividade de texto com sucesso', async () => {
    atividadeService.create.mockResolvedValue('ATIV-123');

    const resultado = await createAtividade(dadosBase);

    expect(resultado.message).toBe("Atividade criada com sucesso!");
    expect(resultado.id).toBe('ATIV-123');
    expect(resultado.data.tipo).toBe('texto');
    expect(atividadeService.create).toHaveBeenCalled();
  });

  it('Deve realizar upload de arquivo se o tipo for pdf/slide', async () => {
    const arquivoMock = {
      originalname: 'exercicio.pdf',
      mimetype: 'application/pdf',
      buffer: Buffer.from('pdf data')
    };
    
    const dadosArquivo = { 
      titulo: 'Lista de Exercícios', 
      disciplinaId: 'MAT-01', 
      tipo: 'pdf' 
    };

    atividadeService.uploadToStorage.mockResolvedValue('https://storage.link/exercicio.pdf');
    atividadeService.create.mockResolvedValue('ATIV-123');

    const resultado = await createAtividade(dadosArquivo, arquivoMock);

    expect(atividadeService.uploadToStorage).toHaveBeenCalledWith(arquivoMock, 'MAT-01');
    expect(resultado.data.urlArquivo).toBe('https://storage.link/exercicio.pdf');
  });

  it('Deve falhar se o tipo de atividade for inválido', async () => {
    const dadosInvalidos = { ...dadosBase, tipo: 'video' };

    try {
      await createAtividade(dadosInvalidos);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toContain('Tipo de atividade inválido');
    }
  });

  it('Deve falhar se faltar campo obrigatório (titulo)', async () => {
    const semTitulo = { disciplinaId: 'GEO-01', tipo: 'texto' };

    try {
      await createAtividade(semTitulo);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toContain('Campos obrigatórios faltando');
    }
  });
});