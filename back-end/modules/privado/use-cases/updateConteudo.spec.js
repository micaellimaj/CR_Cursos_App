const updateConteudo = require('./updateConteudo');
const privadoService = require('../privadoService');

jest.mock('../privadoService');

describe('Unit Test: updateConteudo', () => {
  const msgOriginal = { id: 'M1', professor_id: 'PROF-1', mensagem: 'Original', aluno_id: 'A1', turma_id: 'T1' };

  beforeEach(() => jest.clearAllMocks());

  it('Deve atualizar a mensagem se o professor for o autor', async () => {
    privadoService.getById.mockResolvedValue(msgOriginal);
    
    const resultado = await updateConteudo('M1', 'A1', 'PROF-1', { mensagem: 'Editada' });

    expect(resultado.message).toBe('Conteúdo atualizado com sucesso.');
    expect(privadoService.atualizarMensagem).toHaveBeenCalled();
  });

  it('Deve lançar erro 403 se outro professor tentar editar', async () => {
    privadoService.getById.mockResolvedValue(msgOriginal);

    await expect(updateConteudo('M1', 'A1', 'PROF-IMPOSTOR', { mensagem: 'Hack' }))
      .rejects.toMatchObject({ status: 403, message: /não tem permissão/ });
  });
});