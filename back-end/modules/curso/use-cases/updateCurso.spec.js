const updateCurso = require('./updateCurso');
const cursoService = require('../cursoService');

jest.mock('../cursoService');

describe('Unit Test: updateCurso', () => {
  beforeEach(() => jest.clearAllMocks());

  it('Deve lançar erro 400 se nenhum dado for enviado para atualização', async () => {
    await expect(updateCurso('ID_1', {}))
      .rejects.toMatchObject({ status: 400, message: 'Nenhum dado fornecido.' });
  });

  it('Deve lançar erro se tentar atualizar para um nome que já existe em outro curso', async () => {
    cursoService.findById.mockResolvedValue({ id: 'C1', nome: 'Antigo' });
    cursoService.findByNome.mockResolvedValue({ id: 'C2', nome: 'Novo Nome' });

    await expect(updateCurso('C1', { nome: 'Novo Nome' }))
      .rejects.toMatchObject({ status: 400, message: 'Este nome de curso já existe.' });
  });

  it('Deve atualizar com sucesso quando os dados são válidos', async () => {
    cursoService.findById.mockResolvedValue({ id: 'C1', nome: 'Original' });
    cursoService.findByNome.mockResolvedValue(null);
    cursoService.update.mockResolvedValue(true);

    const resultado = await updateCurso('C1', { nome: 'Atualizado', descricao: 'Nova desc' });

    expect(resultado.message).toBe('Curso atualizado com sucesso.');
    expect(cursoService.update).toHaveBeenCalled();
  });
});