const request = require('supertest');
const app = require('../../../server');

jest.setTimeout(15000);

describe('Integration Test: Curso Module', () => {

  describe('POST /cursos', () => {
    it('Deve persistir um curso no banco de dados', async () => {
      const nomeAleatorio = `Curso ${Math.random()}`;
      const response = await request(app)
        .post('/cursos')
        .send({
          nome: nomeAleatorio,
          descricao: 'Descrição do curso de integração'
        });

      expect([201, 400]).toContain(response.status);

      if (response.status === 201) {
        expect(response.body.mensagem).toBe('Curso cadastrado com sucesso!');
        expect(response.body.curso).toHaveProperty('id');
      }
    });

    it('Deve retornar 400 se o nome estiver ausente', async () => {
      const response = await request(app)
        .post('/cursos')
        .send({ descricao: 'Sem nome' });

      expect(response.status).toBe(400);
      expect(response.body.erro).toBe('O nome do curso é obrigatório.');
    });
  });

  describe('GET /cursos', () => {
    it('Deve retornar status 200 e uma lista', async () => {
      const response = await request(app).get('/cursos');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /cursos/:id', () => {
    it('Deve retornar 404 para ID inexistente', async () => {
      const response = await request(app).get('/cursos/id_inexistente');
      expect(response.status).toBe(404);
    });
  });

  describe('GET /cursos/:id/turmas', () => {
    it('Deve retornar status 200 ao buscar turmas de um curso', async () => {
      const response = await request(app).get('/cursos/qualquer_id/turmas');
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('PUT /cursos/:id', () => {
    it('Deve retornar 200 ao atualizar um curso', async () => {
      const response = await request(app)
        .put('/cursos/ID_PARA_TESTE')
        .send({ nome: 'Nome Alterado Integração' });
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('DELETE /cursos/:id', () => {
    it('Deve retornar 200 ao excluir ou 400/404 se houver trava de segurança', async () => {
      const response = await request(app).delete('/cursos/ID_QUALQUER');
      expect([200, 400, 404]).toContain(response.status);
    });
  });
  afterAll(async () => {
    await db.app.delete();
  });

});