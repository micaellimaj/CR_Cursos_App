const getAlunoByIdUC = require('./getAlunoById');
const alunoService = require('../alunoService');
const Aluno = require('../models/alunoModel');

jest.mock('../alunoService');

describe('Unit Test: getAlunoById', () => {
  it('Deve retornar uma instância de Aluno quando o ID existir', async () => {
    const mockDadosBanco = { full_name: 'Maria Silva', email: 'maria@teste.com', idade: 20 };
    alunoService.getAlunoPorId.mockResolvedValue(mockDadosBanco);

    const resultado = await getAlunoByIdUC('ID_EXISTENTE');

    expect(resultado).toBeInstanceOf(Aluno);
    expect(resultado.id).toBe('ID_EXISTENTE');
    expect(resultado.full_name).toBe('Maria Silva');
  });

  it('Deve lançar erro 404 quando o aluno não for encontrado', async () => {
    alunoService.getAlunoPorId.mockResolvedValue(null);

    await expect(getAlunoByIdUC('ID_FALSO'))
      .rejects.toMatchObject({ status: 404, message: 'Aluno não encontrado' });
  });
});