const updateProfessor = require('./updateProfessor');
const professorService = require('../professorService');
const validarEmail = require('../../aluno/utils/validarEmail');
const calcularIdade = require('../../aluno/utils/calcularIdade');

jest.mock('../professorService');
jest.mock('../../aluno/utils/validarEmail');
jest.mock('../../aluno/utils/calcularIdade');

describe('Unit Test: updateProfessor', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve lançar erro se o e-mail fornecido for inválido', async () => {
    validarEmail.mockReturnValue(false);
    
    await expect(updateProfessor('ID_123', { email: 'email-errado' }))
      .rejects.toMatchObject({ status: 400, message: 'Email inválido.' });
  });

  it('Deve atualizar a idade se a data_nascimento for fornecida', async () => {
    validarEmail.mockReturnValue(true);
    calcularIdade.mockReturnValue(40);
    professorService.updateProfessorService.mockResolvedValue(true);

    const novosDados = { data_nascimento: '1984-01-01' };
    await updateProfessor('ID_123', novosDados);

    expect(professorService.updateProfessorService).toHaveBeenCalledWith(
      'ID_123',
      expect.objectContaining({ idade: 40 })
    );
  });

  it('Deve lançar erro 404 se o professor não existir no banco', async () => {
    validarEmail.mockReturnValue(true);
    professorService.updateProfessorService.mockResolvedValue(false);

    await expect(updateProfessor('ID_INEXISTENTE', { full_name: 'Novo Nome' }))
      .rejects.toMatchObject({ status: 404, message: 'Professor não encontrado.' });
  });

  it('Deve retornar sucesso ao atualizar corretamente', async () => {
    validarEmail.mockReturnValue(true);
    professorService.updateProfessorService.mockResolvedValue(true);

    const resultado = await updateProfessor('ID_123', { full_name: 'Professor Atualizado' });
    
    expect(resultado.message).toBe('Professor atualizado com sucesso');
  });
});