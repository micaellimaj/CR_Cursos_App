const deleteDisciplina = require('./deleteDisciplina');
const disciplinaService = require('../disciplinaService');

jest.mock('../disciplinaService');

describe('Unit Test: deleteDisciplina', () => {
  it('Deve remover uma disciplina com sucesso', async () => {
    disciplinaService.findById.mockResolvedValue({ id: 'DIS-123', nome: 'Teste' });
    disciplinaService.remove.mockResolvedValue(true);

    const resultado = await deleteDisciplina('DIS-123');

    expect(resultado.message).toBe("Disciplina removida com sucesso!");
    expect(disciplinaService.remove).toHaveBeenCalledWith('DIS-123');
  });

  it('Deve lançar erro 404 se a disciplina não existir antes de deletar', async () => {
    disciplinaService.findById.mockResolvedValue(null);

    await expect(deleteDisciplina('ID-FALSO'))
      .rejects.toMatchObject({ status: 404, message: "Disciplina não encontrada." });
  });

  it('Deve lançar erro 500 se o service falhar na remoção', async () => {
    disciplinaService.findById.mockResolvedValue({ id: 'DIS-123' });
    disciplinaService.remove.mockResolvedValue(false);

    await expect(deleteDisciplina('DIS-123'))
      .rejects.toMatchObject({ status: 500, message: "Erro ao remover disciplina." });
  });
});