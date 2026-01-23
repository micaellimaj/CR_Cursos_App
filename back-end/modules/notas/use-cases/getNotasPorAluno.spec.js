const getNotasPorAluno = require('./getNotasPorAluno');
const notaService = require('../notaService');

jest.mock('../notaService');

describe('Unit Test: getNotasPorAluno', () => {
  
  it('Deve retornar uma lista de notas formatadas para um aluno', async () => {
    const mockNotas = [
      { id: 'N1', valor: 8, alunoId: 'ALU-1' },
      { id: 'N2', valor: 9, alunoId: 'ALU-1' }
    ];
    notaService.findByAluno.mockResolvedValue(mockNotas);

    const resultado = await getNotasPorAluno('ALU-1');

    expect(Array.isArray(resultado)).toBe(true);
    expect(resultado.length).toBe(2);
    expect(resultado[0]).toHaveProperty('id', 'N1');
    expect(resultado[0].collection).toBeUndefined();
  });

  it('Deve retornar array vazio se o aluno não tiver notas', async () => {
    notaService.findByAluno.mockResolvedValue([]);
    const resultado = await getNotasPorAluno('ALU-SEM-NOTA');
    expect(resultado).toEqual([]);
  });

  it('Deve lançar erro 400 se o alunoId não for informado', async () => {
    await expect(getNotasPorAluno(null))
      .rejects.toMatchObject({ status: 400, message: /ID do aluno é obrigatório/ });
  });
});