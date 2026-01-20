const getAllAlunosUC = require('./getAllAlunos');
const alunoService = require('../alunoService');
const Aluno = require('../models/alunoModel');

jest.mock('../alunoService');

describe('Unit Test: getAllAlunos', () => {
  it('Deve retornar uma lista de instâncias de Aluno', async () => {
    const mockLista = [
      { id: '1', full_name: 'Aluno A', idade: 25 },
      { id: '2', full_name: 'Aluno B', idade: 30 }
    ];
    alunoService.getTodosAlunos.mockResolvedValue(mockLista);

    const resultado = await getAllAlunosUC();

    expect(Array.isArray(resultado)).toBe(true);
    expect(resultado).toHaveLength(2);
    expect(resultado[0]).toBeInstanceOf(Aluno);
  });

  it('Deve retornar um array vazio se não houver alunos no banco', async () => {
    alunoService.getTodosAlunos.mockResolvedValue([]);

    const resultado = await getAllAlunosUC();

    expect(resultado).toEqual([]);
    expect(resultado).toHaveLength(0);
  });
});