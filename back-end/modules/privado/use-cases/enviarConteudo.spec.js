const enviarConteudo = require('./enviarConteudo');
const privadoService = require('../privadoService');
const turmaService = require('../../turma/turmaService');

jest.mock('../privadoService');
jest.mock('../../turma/turmaService');
jest.mock('../utils/gerarIdPrivado', () => () => 'PRIV-999');

describe('Unit Test: enviarConteudo', () => {
  const professorId = 'PROF-01';
  const dadosValidos = {
    aluno_id: 'ALUNO-123',
    turma_id: 'TURMA-01',
    mensagem: 'Olá aluno, aqui está seu feedback.'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve enviar conteúdo privado com sucesso', async () => {
    turmaService.getTurmaById.mockResolvedValue({
      id: 'TURMA-01',
      professores: { 'PROF-01': true },
      alunos: { 'ALUNO-123': true }
    });
    privadoService.salvarMensagem.mockResolvedValue('PRIV-999');

    const resultado = await enviarConteudo(dadosValidos, professorId);

    expect(resultado.message).toBe('Conteúdo enviado ao aluno com sucesso.');
    expect(resultado.id).toBe('PRIV-999');
    expect(privadoService.salvarMensagem).toHaveBeenCalled();
  });

  it('Deve barrar se o professor não pertencer à turma (403)', async () => {
    turmaService.getTurmaById.mockResolvedValue({
      id: 'TURMA-01',
      professores: { 'PROF-OUTRO': true },
      alunos: { 'ALUNO-123': true }
    });

    await expect(enviarConteudo(dadosValidos, professorId))
      .rejects.toMatchObject({ status: 403, message: /Acesso negado/ });
  });

  it('Deve barrar se o aluno não estiver na turma (400)', async () => {
    turmaService.getTurmaById.mockResolvedValue({
      id: 'TURMA-01',
      professores: { 'PROF-01': true },
      alunos: { 'ALUNO-OUTRO': true }
    });

    await expect(enviarConteudo(dadosValidos, professorId))
      .rejects.toMatchObject({ status: 400, message: /não está matriculado/ });
  });

  it('Deve falhar se não houver mensagem nem arquivos', async () => {
    const dadosVazios = { aluno_id: 'ALUNO-123', turma_id: 'TURMA-01', mensagem: '' };

    await expect(enviarConteudo(dadosVazios, professorId))
      .rejects.toMatchObject({ status: 400, message: /mensagem de texto ou ao menos um arquivo/ });
  });
});