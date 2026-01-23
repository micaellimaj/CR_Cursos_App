const deleteNota = require('./deleteNota');
const notaService = require('../notaService');

jest.mock('../notaService');

describe('Unit Test: deleteNota', () => {
  it('Deve remover uma nota com sucesso', async () => {
    notaService.findById.mockResolvedValue({ id: 'NOT-123', valor: 10 });
    notaService.remove.mockResolvedValue(true);

    const resultado = await deleteNota('NOT-123');

    expect(resultado.message).toBe("Nota removida com sucesso!");
    expect(notaService.remove).toHaveBeenCalledWith('NOT-123');
  });

  it('Deve lançar erro 404 se a nota não existir', async () => {
    notaService.findById.mockResolvedValue(null);

    await expect(deleteNota('NOT-FALSA'))
      .rejects.toMatchObject({ status: 404, message: "Nota não encontrada." });
  });

  it('Deve lançar erro 400 se o ID não for enviado', async () => {
    await expect(deleteNota(null))
      .rejects.toMatchObject({ status: 400, message: "ID da nota não informado." });
  });
});