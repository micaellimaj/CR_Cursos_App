const deleteAlunoUC = require('./deleteAluno');
const alunoService = require('../alunoService');

jest.mock('../alunoService');

describe('Unit Test: deleteAluno Use Case', () => {
  
  it('Deve retornar mensagem de sucesso ao deletar um aluno existente', async () => {
    alunoService.deletarAluno.mockResolvedValue(true);

    const resultado = await deleteAlunoUC('ID_VALIDO');

    expect(resultado).toEqual({ message: 'Aluno removido com sucesso' });
    expect(alunoService.deletarAluno).toHaveBeenCalledWith('ID_VALIDO');
  });

  it('Deve lançar erro 404 se o service retornar falso (aluno não encontrado)', async () => {
    alunoService.deletarAluno.mockResolvedValue(false);

    await expect(deleteAlunoUC('ID_INEXISTENTE'))
      .rejects.toMatchObject({ 
        status: 404, 
        message: 'Aluno não encontrado' 
      });
  });
});