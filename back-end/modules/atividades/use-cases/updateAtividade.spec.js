const updateAtividade = require('./updateAtividade');
const atividadeService = require('../atividadeService');

jest.mock('../atividadeService');

describe('Unit Test: updateAtividade', () => {
  const atividadeAntiga = { 
    id: 'ATIV-1', 
    titulo: 'Título Antigo', 
    disciplinaId: 'DISC-1', 
    urlArquivo: null 
  };

  beforeEach(() => jest.clearAllMocks());

  it('Deve atualizar apenas o título com sucesso', async () => {
    atividadeService.getById.mockResolvedValue(atividadeAntiga);
    
    const resultado = await updateAtividade('ATIV-1', { titulo: 'Título Novo' });

    expect(atividadeService.update).toHaveBeenCalledWith('ATIV-1', expect.objectContaining({
      titulo: 'Título Novo',
      disciplinaId: 'DISC-1'
    }));
    expect(resultado.message).toBe("Atividade atualizada com sucesso!");
  });

  it('Deve realizar novo upload se um arquivo for enviado na atualização', async () => {
    atividadeService.getById.mockResolvedValue(atividadeAntiga);
    atividadeService.uploadToStorage.mockResolvedValue('http://novo-link.com/doc.pdf');
    
    const arquivoMock = { originalname: 'doc.pdf', buffer: Buffer.from('...') };
    
    await updateAtividade('ATIV-1', {}, arquivoMock);

    expect(atividadeService.uploadToStorage).toHaveBeenCalled();
    expect(atividadeService.update).toHaveBeenCalledWith('ATIV-1', expect.objectContaining({
      urlArquivo: 'http://novo-link.com/doc.pdf'
    }));
  });
});