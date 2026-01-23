const createNota = require('./createNota');
const notaService = require('../notaService');
const validarPermissaoProfessor = require('./validarPermissaoProfessor');

jest.mock('../notaService');
jest.mock('./validarPermissaoProfessor');
jest.mock('../utils/gerarIdNota', () => () => 'NOT-TEST123');

describe('Unit Test: createNota', () => {
  
  const dadosValidos = {
    alunoId: 'ALU-1',
    disciplinaId: 'DIS-1',
    professorId: 'PROF-1',
    turmaId: 'TUR-1',
    valor: 8.5
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve lançar nota com sucesso (Caminho Feliz)', async () => {
    validarPermissaoProfessor.mockResolvedValue(true);
    notaService.create.mockResolvedValue('NOT-TEST123');

    const resultado = await createNota(dadosValidos);

    expect(resultado.message).toBe("Nota lançada com sucesso!");
    expect(resultado.data.valor).toBe(8.5);
    expect(notaService.create).toHaveBeenCalledWith('NOT-TEST123', expect.any(Object));
  });

  it('Deve falhar se a nota for maior que 10', async () => {
    const dadosInvalidos = { ...dadosValidos, valor: 11 };

    await expect(createNota(dadosInvalidos))
      .rejects.toMatchObject({ 
        status: 400, 
        message: 'A nota deve ser um número entre 0 e 10.' 
      });
  });

  it('Deve falhar se o professor não tiver permissão', async () => {
    validarPermissaoProfessor.mockRejectedValue({ status: 403, message: 'Não autorizado' });

    await expect(createNota(dadosValidos))
      .rejects.toMatchObject({ status: 403, message: 'Não autorizado' });
  });
});