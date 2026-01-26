const deleteFrequencia = require('./deleteFrequencia');
const { db } = require('../../../shared/config/firebase');

jest.mock('../../../shared/config/firebase', () => ({
  db: {
    ref: jest.fn()
  }
}));

describe('Unit Test: deleteFrequencia', () => {
  const mockId = 'FREQ-DELETE-123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve deletar uma frequência com sucesso', async () => {
    const mockSnapshot = { exists: () => true };
    const mockRemove = jest.fn().mockResolvedValue();
    
    db.ref.mockReturnValue({
      once: jest.fn().mockResolvedValue(mockSnapshot),
      remove: mockRemove
    });

    const resultado = await deleteFrequencia(mockId);

    expect(resultado.message).toBe('Registro de frequência excluído com sucesso.');
    expect(mockRemove).toHaveBeenCalled();
  });

  it('Deve retornar 404 se o registro não existir', async () => {
    const mockSnapshot = { exists: () => false };
    
    db.ref.mockReturnValue({
      once: jest.fn().mockResolvedValue(mockSnapshot)
    });

    await expect(deleteFrequencia(mockId))
      .rejects.toMatchObject({ status: 404, message: 'Registro não encontrado.' });
  });
});