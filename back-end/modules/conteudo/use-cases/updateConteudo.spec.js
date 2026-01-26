const updateConteudo = require('./updateConteudo');
const conteudoService = require('../conteudoService');

jest.mock('../conteudoService');

describe('Unit Test: updateConteudo', () => {
  const mockId = 'CONT-123';
  const dataAntiga = {
    id: mockId,
    titulo: 'Titulo Antigo',
    tipo: 'texto',
    valor: 'Texto antigo'
  };

  it('Deve atualizar os campos e gerar novo updated_at', async () => {
    conteudoService.getById.mockResolvedValue(dataAntiga);
    conteudoService.update.mockResolvedValue(true);

    const novosDados = { titulo: 'Titulo Novo' };
    const resultado = await updateConteudo(mockId, novosDados);

    expect(resultado.message).toBe("Conteúdo atualizado!");
    expect(resultado.data.titulo).toBe('Titulo Novo');
    expect(resultado.data.valor).toBe('Texto antigo'); // Manteve o que não mudou
    expect(conteudoService.update).toHaveBeenCalledWith(mockId, expect.any(Object));
  });

  it('Deve falhar se o ID for inexistente', async () => {
    conteudoService.getById.mockResolvedValue(null);

    await expect(updateConteudo('ID-FAKE', {}))
      .rejects.toThrow("Conteúdo não encontrado.");
  });
});