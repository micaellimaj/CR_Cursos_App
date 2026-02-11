const getConteudoByAluno = require('./getConteudoByAluno');
const privadoService = require('../privadoService');

jest.mock('../privadoService');

describe('Unit Test: getConteudoByAluno', () => {
  it('Deve retornar lista de mensagens formatadas para o aluno', async () => {
    const mockData = [
      { id: 'M1', mensagem: 'Olá', aluno_id: 'A1' },
      { id: 'M2', mensagem: 'Tarefa', aluno_id: 'A1' }
    ];
    privadoService.listarPorAluno.mockResolvedValue(mockData);

    const resultado = await getConteudoByAluno('ALUNO-123');

    expect(Array.isArray(resultado)).toBe(true);
    expect(resultado[0].mensagem).toBe('Olá');
    expect(privadoService.listarPorAluno).toHaveBeenCalledWith('ALUNO-123');
  });

  it('Deve lançar erro 400 se alunoId for omitido', async () => {
    await expect(getConteudoByAluno(null))
      .rejects.toMatchObject({ status: 400 });
  });
});