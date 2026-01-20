const createAluno = require('./createAluno');
const alunoService = require('../alunoService');
const turmaService = require('../../turma/turmaService');
const calcularIdade = require('../utils/calcularIdade');

// Mocks
jest.mock('../alunoService');
jest.mock('../../turma/turmaService.js');
jest.mock('../utils/calcularIdade');
jest.mock('../utils/gerarIdPersonalizado', () => () => 'ID_123');
jest.mock('../types/alunoSchema', () => ({
  validarDadosAluno: jest.fn()
}));

describe('Unit Test: createAluno', () => {
  
  it('Deve lançar erro se a data de nascimento resultar em idade inválida (NaN)', async () => {
    calcularIdade.mockReturnValue(NaN);
    
    await expect(createAluno({ data_nascimento: 'data-errada' }))
      .rejects.toMatchObject({ status: 400, message: 'Data de nascimento inválida.' });
  });

  it('Deve lançar erro se for menor de idade e faltar dados do responsável', async () => {
    calcularIdade.mockReturnValue(15);
    
    const dadosIncompletos = {
      data_nascimento: '2010-01-01',
      email: 'menor@teste.com'
    };

    await expect(createAluno(dadosIncompletos))
      .rejects.toMatchObject({ message: 'Responsável obrigatório para menores' });
  });

  it('Deve criar o aluno com sucesso (Caminho Feliz)', async () => {
    calcularIdade.mockReturnValue(25);
    alunoService.emailExiste.mockResolvedValue(false);
    
    turmaService.getTurmaPorId.mockResolvedValue({ id: 'T1', nome: 'Desenvolvimento Web' });
    
    const dados = {
      nome: 'Lucas',
      email: 'lucas@teste.com',
      senha: '123',
      turma_id: 'T1',
      data_nascimento: '1999-01-01'
    };

    const resultado = await createAluno(dados);

    expect(resultado).toEqual({
      id: 'ID_123',
      message: 'Aluno criado com sucesso',
      curso: 'Desenvolvimento Web'
    });
  });
});