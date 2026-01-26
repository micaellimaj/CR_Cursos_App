const updateFrequencia = require('./updateFrequencia');
const { db } = require('../../../shared/config/firebase');

jest.mock('../../../shared/config/firebase', () => ({
  db: {
    ref: jest.fn()
  }
}));

describe('Unit Test: updateFrequencia', () => {
  const mockId = 'FREQ-UPDATE-123';
  const dadosAntigos = {
    aluno_id: 'ALU1',
    status: true,
    data: '20/05/2024'
  };

  it('Deve atualizar o status da frequência com sucesso', async () => {
    const mockSnapshot = { 
      exists: () => true,
      val: () => dadosAntigos
    };
    const mockUpdate = jest.fn().mockResolvedValue();

    db.ref.mockReturnValue({
      once: jest.fn().mockResolvedValue(mockSnapshot),
      update: mockUpdate
    });

    const resultado = await updateFrequencia(mockId, { status: false });

    expect(resultado.message).toBe('Frequência atualizada com sucesso.');
    expect(resultado.data.status).toBe(false);
    expect(resultado.data).toHaveProperty('updated_at');
    expect(mockUpdate).toHaveBeenCalled();
  });

  it('Deve falhar ao tentar atualizar registro inexistente', async () => {
    db.ref.mockReturnValue({
      once: jest.fn().mockResolvedValue({ exists: () => false })
    });

    await expect(updateFrequencia(mockId, { status: false }))
      .rejects.toMatchObject({ status: 404 });
  });
});