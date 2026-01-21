const deleteProfessor = require('./deleteProfessor');
const professorService = require('../professorService');

jest.mock('../professorService');

describe('Unit Test: deleteProfessor', () => {
  it('Deve remover o professor com sucesso', async () => {
    professorService.deleteProfessorService.mockResolvedValue(true);

    const resultado = await deleteProfessor('ID_123');

    expect(resultado.message).toBe('Professor removido com sucesso');
    expect(professorService.deleteProfessorService).toHaveBeenCalledWith('ID_123');
  });

  it('Deve lançar erro 404 se o professor não for encontrado para deleção', async () => {
    professorService.deleteProfessorService.mockResolvedValue(false);

    await expect(deleteProfessor('ID_FANTASMA'))
      .rejects.toMatchObject({ status: 404, message: 'Professor não encontrado.' });
  });
});