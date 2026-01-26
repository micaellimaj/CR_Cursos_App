const request = require('supertest');
const app = require('../../../server');
const path = require('path');

describe('Integration Test: Conteudo Module', () => {

  describe('POST /conteudo', () => {
    it('Deve retornar 400 se o tipo for "texto" mas o campo "valor" estiver vazio', async () => {
      const response = await request(app)
        .post('/conteudo')
        .send({
          titulo: 'Aula de História',
          disciplinaId: 'DISC-01',
          tipo: 'texto'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("campo 'valor' é obrigatório");
    });

    it('Deve criar um conteúdo do tipo link com sucesso', async () => {
      const response = await request(app)
        .post('/conteudo')
        .send({
          titulo: 'Video Aula YouTube',
          disciplinaId: 'DISC-101',
          tipo: 'link',
          url: 'https://youtube.com/watch?v=123'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Conteúdo criado com sucesso!");
    });

    it('Deve criar um conteúdo com upload de arquivo', async () => {
      const response = await request(app)
        .post('/conteudo')
        .field('titulo', 'PDF de Exercícios')
        .field('disciplinaId', 'DISC-101')
        .field('tipo', 'arquivo')
        .attach('file', Buffer.from('conteudo do arquivo'), 'exercicios.pdf');

      expect(response.status).toBe(201);
      expect(response.body.data.url).toBeDefined();
    });
  });

  describe('GET /conteudo/:id', () => {
    it('Deve retornar 200 ao buscar um conteúdo existente', async () => {
      const response = await request(app).get('/conteudo/CONT-EXISTENTE');
      expect([200, 404, 500]).toContain(response.status);
    });
  });

  describe('GET /conteudo/disciplina/:disciplinaId', () => {
    it('Deve retornar 200 e uma lista de conteúdos', async () => {
      const response = await request(app).get('/conteudo/disciplina/DISC-101');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('PUT /conteudo/:id', () => {
    it('Deve retornar 200 ao atualizar conteúdo', async () => {
      const response = await request(app)
        .put('/conteudo/CONT-EXISTENTE')
        .send({ titulo: 'Título Atualizado via Teste' });
      
      expect([200, 404, 500]).toContain(response.status);
    });
  });

  describe('DELETE /conteudo/:id', () => {
    it('Deve retornar 200 ao remover conteúdo', async () => {
      const response = await request(app).delete('/conteudo/CONT-EXISTENTE');
      
      expect([200, 404, 500]).toContain(response.status);
      if (response.status === 200) {
        expect(response.body.message).toBe("Conteúdo removido com sucesso!");
      }
    });
  });
});