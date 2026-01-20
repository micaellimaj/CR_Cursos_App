const updateAlunoUC = require('./updateAluno');
const alunoService = require('../alunoService');
const calcularIdade = require('../utils/calcularIdade');
const validarEmail = require('../utils/validarEmail');

jest.mock('../alunoService');
jest.mock('../utils/calcularIdade');
jest.mock('../utils/validarEmail');

describe('Unit Test: updateAluno', () => {
  
  it('Deve lançar erro se o e-mail fornecido for inválido', async () => {
    validarEmail.mockReturnValue(false);
    
    await expect(updateAlunoUC('123', { email: 'email-errado' }))
      .rejects.toMatchObject({ status: 400, message: 'Email inválido' });
  });

  it('Deve exigir responsável se a nova data de nascimento for de um menor', async () => {
    calcularIdade.mockReturnValue(16);
    
    const dados = { data_nascimento: '2008-01-01' };

    await expect(updateAlunoUC('123', dados))
      .rejects.toMatchObject({ status: 400, message: 'Responsável obrigatório para menores' });
  });

  it('Deve atualizar com sucesso quando os dados são válidos', async () => {
    alunoService.atualizarAluno.mockResolvedValue(true);
    validarEmail.mockReturnValue(true);
    
    const resultado = await updateAlunoUC('ID_ALUNO', { nome: 'Novo Nome' });

    expect(resultado.message).toBe('Aluno atualizado com sucesso');
    expect(alunoService.atualizarAluno).toHaveBeenCalled();
  });

  it('Deve retornar 404 se o aluno não existir no banco', async () => {
    alunoService.atualizarAluno.mockResolvedValue(false);
    
    await expect(updateAlunoUC('ID_FALSO', { nome: 'Teste' }))
      .rejects.toMatchObject({ status: 404, message: 'Aluno não encontrado' });
  });
});