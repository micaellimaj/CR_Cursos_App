const getAllProfessores = require('./getAllProfessores');
const professorService = require('../professorService');

jest.mock('../professorService');

describe('Unit Test: getAllProfessores', () => {
  it('Deve retornar uma lista de instâncias de Professor', async () => {
    const mockData = [
      { id: '1', full_name: 'Prof A', email: 'a@teste.com' },
      { id: '2', full_name: 'Prof B', email: 'b@teste.com' }
    ];
    
    professorService.getAllProfessoresService.mockResolvedValue(mockData);

    const resultado = await getAllProfessores();

    expect(resultado.length).toBe(2);
    expect(resultado[0].full_name).toBe('Prof A');
    expect(resultado[0].tipo).toBe('professor'); 
  });
});
