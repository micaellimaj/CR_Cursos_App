const createConteudo = require('./createConteudo');
const conteudoService = require('../conteudoService');

jest.mock('../conteudoService');
jest.mock('../utils/gerarIdConteudo', () => () => 'CONT-123');

describe('Unit Test: createConteudo', () => {
  
  const dadosBase = {
    titulo: 'Aula de Matemática',
    disciplinaId: 'MAT-01',
    tipo: 'texto',
    valor: 'Conteúdo da aula escrito aqui.'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve criar conteúdo de texto com sucesso', async () => {
    conteudoService.create.mockResolvedValue('CONT-123');

    const resultado = await createConteudo(dadosBase);

    expect(resultado.message).toBe("Conteúdo criado com sucesso!");
    expect(resultado.id).toBe('CONT-123');
    expect(conteudoService.create).toHaveBeenCalled();
  });

  it('Deve realizar upload se houver um arquivo presente', async () => {
    const arquivoMock = {
      originalname: 'aula.pdf',
      mimetype: 'application/pdf',
      buffer: Buffer.from('...')
    };
    
    const dadosArquivo = { 
      titulo: 'Slide PDF', 
      disciplinaId: 'MAT-01', 
      tipo: 'arquivo' 
    };

    conteudoService.uploadToStorage.mockResolvedValue('https://storage.link/aula.pdf');
    conteudoService.create.mockResolvedValue('CONT-123');

    const resultado = await createConteudo(dadosArquivo, arquivoMock);

    expect(conteudoService.uploadToStorage).toHaveBeenCalledWith(arquivoMock, 'MAT-01');
    expect(resultado.data.url).toBe('https://storage.link/aula.pdf');
    expect(resultado.data.fileName).toBe('aula.pdf');
  });

  it('Deve falhar se o tipo de conteúdo for inválido', async () => {
    const dadosInvalidos = { ...dadosBase, tipo: 'podcast' };

    await expect(createConteudo(dadosInvalidos))
      .rejects.toThrow("Tipo de conteúdo inválido");
  });

  it('Deve falhar se faltar URL para tipo vídeo', async () => {
    const dadosVideoSemUrl = { 
      titulo: 'Aula 01', 
      disciplinaId: 'DISC-1', 
      tipo: 'video' 
    };

    await expect(createConteudo(dadosVideoSemUrl))
      .rejects.toThrow("a 'url' é obrigatória");
  });
});