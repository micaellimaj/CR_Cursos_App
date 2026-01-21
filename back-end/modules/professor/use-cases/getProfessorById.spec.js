const getProfessorById = require('./getProfessorById');
const professorService = require('../professorService');

jest.mock('../professorService');

describe('Unit Test: getProfessorById', () => {
  it('Deve retornar o professor quando o ID existir', async () => {
    const mockProfessor = { full_name: 'Allan Turing', email: 'turing@email.com' };
    professorService.getProfessorByIdService.mockResolvedValue(mockProfessor);

    const resultado = await getProfessorById('ID_REAL');

    expect(resultado.id).toBe('ID_REAL');
    expect(resultado.full_name).toBe('Allan Turing');
  });

  it('Deve lançar erro 404 quando o professor não for encontrado', async () => {
    professorService.getProfessorByIdService.mockResolvedValue(null);

    await expect(getProfessorById('id-inexistente'))
      .rejects.toMatchObject({ status: 404, message: 'Professor não encontrado.' });
  });
});