const deleteConteudo = require('./deleteConteudo');
const privadoService = require('../privadoService');

jest.mock('../privadoService');

describe('Unit Test: deleteConteudo', () => {
  it('Deve remover a mensagem com sucesso', async () => {
    privadoService.getById.mockResolvedValue({ id: 'M1', professor_id: 'PROF-1' });
    
    const resultado = await deleteConteudo('M1', 'A1', 'PROF-1');

    expect(privadoService.removerMensagem).toHaveBeenCalledWith('A1', 'M1');
    expect(resultado.message).toBe('Conteúdo removido com sucesso.');
  });

  it('Deve lançar erro 404 se a mensagem não existir', async () => {
    privadoService.getById.mockResolvedValue(null);

    await expect(deleteConteudo('M1', 'A1', 'P1'))
      .rejects.toMatchObject({ status: 404 });
  });
});