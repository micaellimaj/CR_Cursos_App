const createProfessor = require('./createProfessor');
const professorService = require('../professorService');
const turmaService = require('../../turma/turmaService');
const calcularIdade = require('../../aluno/utils/calcularIdade');
const bcrypt = require('bcryptjs');

jest.mock('../professorService');
jest.mock('../../turma/turmaService');
jest.mock('../../aluno/utils/calcularIdade');
jest.mock('bcryptjs');
jest.mock('../utils/gerarIdProfessor', () => () => 'PROF_123');
jest.mock('../types/professorSchema', () => ({
  validarDadosProfessor: jest.fn()
}));

describe('Unit Test: createProfessor', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve lançar erro se o professor for menor de 18 anos', async () => {
    calcularIdade.mockReturnValue(17);
    
    const dados = { data_nascimento: '2007-01-01', email: 'jovem@teste.com' };

    await expect(createProfessor(dados))
      .rejects.toMatchObject({ status: 400, message: 'Professor deve ser maior de idade.' });
  });

  it('Deve lançar erro se o e-mail já estiver cadastrado', async () => {
    calcularIdade.mockReturnValue(30);
    professorService.findProfessorByEmail.mockResolvedValue(true);
    
    const dados = { email: 'existente@teste.com', data_nascimento: '1990-01-01' };

    await expect(createProfessor(dados))
      .rejects.toMatchObject({ status: 400, message: 'E-mail já cadastrado.' });
  });

  it('Deve lançar erro se a turma principal informada não existir', async () => {
    calcularIdade.mockReturnValue(30);
    professorService.findProfessorByEmail.mockResolvedValue(false);
    turmaService.getTurmaPorId.mockResolvedValue(null);

    const dados = { 
      email: 'novo@teste.com', 
      data_nascimento: '1990-01-01',
      turma_id_principal: 'TURMA_FANTASMA' 
    };

    await expect(createProfessor(dados))
      .rejects.toMatchObject({ status: 404, message: 'Turma principal não encontrada.' });
  });

  it('Deve criar o professor com sucesso e associar à turma (Caminho Feliz)', async () => {
    calcularIdade.mockReturnValue(35);
    professorService.findProfessorByEmail.mockResolvedValue(false);
    professorService.createProfessorService.mockResolvedValue('PROF_123');
    turmaService.getTurmaPorId.mockResolvedValue({ id: 'T1', nome: 'Matemática Avançada' });
    bcrypt.hash.mockResolvedValue('senha_hashed');

    const dados = {
      full_name: 'Professor Girafales',
      email: 'girafales@escola.com',
      senha: '123',
      data_nascimento: '1985-01-01',
      turma_id_principal: 'T1'
    };

    const resultado = await createProfessor(dados);

    expect(resultado).toEqual({
      id: 'PROF_123',
      message: 'Professor criado com sucesso',
      turma_associada: 'Matemática Avançada'
    });
    
    expect(turmaService.adicionarProfessor).toHaveBeenCalledWith('T1', 'PROF_123');
  });
});