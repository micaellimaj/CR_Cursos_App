const updateNota = require('./updateNota');
const notaService = require('../notaService');
const validarPermissao = require('./validarPermissaoProfessor');

jest.mock('../notaService');
jest.mock('./validarPermissaoProfessor');

describe('Unit Test: updateNota', () => {
  const notaOriginal = {
    id: 'NOT-123',
    valor: 7,
    descricao: 'Teste inicial',
    professorId: 'P1',
    turmaId: 'T1',
    disciplinaId: 'D1',
    alunoId: 'A1'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve atualizar o valor da nota com sucesso', async () => {
    notaService.findById.mockResolvedValue(notaOriginal);
    validarPermissao.mockResolvedValue(true);
    notaService.update.mockResolvedValue(true);

    const resultado = await updateNota('NOT-123', { nota: 9.5 });

    expect(resultado.message).toBe("Nota atualizada com sucesso!");
    expect(notaService.update).toHaveBeenCalledWith('NOT-123', expect.objectContaining({
      valor: 9.5
    }));
  });

  it('Deve manter o valor original se apenas a descrição for enviada', async () => {
    notaService.findById.mockResolvedValue(notaOriginal);
    validarPermissao.mockResolvedValue(true);
    notaService.update.mockResolvedValue(true);

    await updateNota('NOT-123', { descricao: 'Nova Descrição' });

    expect(notaService.update).toHaveBeenCalledWith('NOT-123', expect.objectContaining({
      valor: 7,
      descricao: 'Nova Descrição'
    }));
  });

  it('Deve lançar erro 403 se o professor não tiver permissão de alteração', async () => {
    notaService.findById.mockResolvedValue(notaOriginal);
    validarPermissao.mockRejectedValue({ status: 403, message: 'Não autorizado' });

    await expect(updateNota('NOT-123', { nota: 10 }))
      .rejects.toMatchObject({ status: 403 });
  });
});