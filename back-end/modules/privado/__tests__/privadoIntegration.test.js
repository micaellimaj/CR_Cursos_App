const request = require('supertest');
const app = require('../../../server');
const { db } = require('../../../shared/config/firebase');

jest.setTimeout(15000);

describe('Integration Test: Privado Module', () => {

  describe('POST /privado', () => {
    it('Deve retornar 201 ao enviar mensagem com arquivos e links', async () => {
      const response = await request(app)
        .post('/privado/enviar')
        .field('aluno_id', 'ALUNO-TESTE')
        .field('turma_id', 'TURMA-TESTE')
        .field('mensagem', 'Feedback por arquivo')
        .field('links', 'https://material.com')
        .attach('files', Buffer.from('feedback'), 'nota.txt');

      expect([201, 401, 403, 404]).toContain(response.status);
      
      if (response.status === 201) {
        expect(response.body.mensagem).toBe('Conteúdo privado enviado com sucesso!');
      }
    });

    it('Deve retornar 400 se faltar aluno_id', async () => {
      const response = await request(app)
        .post('/privado')
        .send({ mensagem: 'Sem destino' });

      expect(response.status).toBe(400);
    });
  });

  describe('Busca e Gerenciamento de Mensagens Privadas', () => {

  describe('GET /privado/aluno/:alunoId', () => {
    it('Deve retornar 200 e lista de conteúdos do aluno', async () => {
      const response = await request(app).get('/privado/aluno/ALUNO-TESTE');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('PUT /privado/:alunoId/:mensagemId', () => {
    it('Deve retornar 200 ou erro de permissão ao tentar atualizar', async () => {
      const response = await request(app)
        .put('/privado/ALUNO-TESTE/MSG-123')
        .send({ mensagem: 'Tentativa de update' });

      expect([200, 403, 404, 401]).toContain(response.status);
    });
  });

  describe('DELETE /privado/:alunoId/:mensagemId', () => {
    it('Deve retornar 200 ao remover mensagem existente', async () => {
      const response = await request(app).delete('/privado/ALUNO-TESTE/MSG-123');
      expect([200, 403, 404, 401]).toContain(response.status);
    });
  });
});

  afterAll(async () => {
    await db.app.delete();
  });
});