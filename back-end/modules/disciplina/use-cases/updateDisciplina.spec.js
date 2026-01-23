const updateDisciplina = require('./updateDisciplina');
const disciplinaService = require('../disciplinaService');

jest.mock('../disciplinaService');

describe('Unit Test: updateDisciplina', () => {
  it('Deve atualizar os dados com sucesso', async () => {
    disciplinaService.findById.mockResolvedValue({ id: 'DIS-123', nome: 'Antigo' });
    disciplinaService.update.mockResolvedValue(true);

    const novosDados = { nome: 'Novo Nome', professorId: 'PROF-NEW' };
    const resultado = await updateDisciplina('DIS-123', novosDados);

    expect(resultado.message).toBe("Disciplina atualizada com sucesso!");
    expect(disciplinaService.update).toHaveBeenCalledWith(
      'DIS-123',
      expect.not.objectContaining({ id: 'DIS-123' })
    );
  });

  it('Deve lançar erro 404 se tentar atualizar ID inexistente', async () => {
    disciplinaService.findById.mockResolvedValue(null);

    await expect(updateDisciplina('ID-FALSO', { nome: 'Teste' }))
      .rejects.toMatchObject({ status: 404, message: "Disciplina não encontrada." });
  });
});