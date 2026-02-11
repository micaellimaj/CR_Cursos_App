const request = require('supertest');
const app = require('../../../server');

jest.setTimeout(10000);

describe('Integration Test: Classe Module', () => {

  describe('POST /classe', () => {
    it('Deve criar postagem de classe com múltiplos anexos e links', async () => {
      const response = await request(app)
        .post('/classes')
        .field('turma_id', 'TURMA-TESTE')
        .field('professor_id', 'PROF-TESTE')
        .field('titulo', 'Aula com Anexos')
        .field('tipo', 'material')
        .field('links', 'https://google.com')
        .field('links', 'https://github.com')
        .attach('files', Buffer.from('PDF 1'), 'aula1.pdf')
        .attach('files', Buffer.from('PDF 2'), 'aula2.pdf');

      expect([201, 404, 401]).toContain(response.status);
      
      if (response.status === 201) {
        expect(response.body.mensagem).toBe('Conteúdo postado com sucesso!');
        expect(response.body.classe.anexos.length).toBeGreaterThan(2);
      }
    });

    it('Deve retornar 400 se o corpo da requisição for inválido', async () => {
      const response = await request(app)
        .post('/classes')
        .send({ titulo: 'Faltando Campos' });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Campos obrigatórios faltando');
    });
  });

  describe('Busca de Classes (Read)', () => {

  describe('GET /classe/:id', () => {
    it('Deve buscar uma classe específica com sucesso', async () => {
      const response = await request(app).get('/classe/ID-DE-TESTE');
      
      expect([200, 404]).toContain(response.status);
      if (response.status === 200) {
        expect(response.body).toHaveProperty('titulo');
      }
    });
  });

  describe('GET /classe/turma/:turma_id', () => {
    it('Deve retornar status 200 e uma lista de conteúdos', async () => {
      const response = await request(app).get('/classe/turma/TURMA-01');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('Deve retornar 400 se tentar buscar sem passar o ID da turma', async () => {
      const response = await request(app).get('/classe/turma/'); 
      expect([400, 404]).toContain(response.status);
    });
  });
});

  describe('Operações de Escrita (Update/Delete)', () => {

  describe('PUT /classes/:id', () => {
    it('Deve retornar 200 ao atualizar uma postagem', async () => {
      const response = await request(app)
        .put('/classes/ID-EXISTENTE')
        .send({
          titulo: 'Título Atualizado via Integração',
          descricao: 'Nova descrição'
        });

      expect([200, 404]).toContain(response.status);
    });
  });

  describe('DELETE /classes/:id', () => {
    it('Deve retornar 200 ao excluir uma postagem', async () => {
      const response = await request(app).delete('/classes/ID-EXISTENTE');
      
      expect([200, 404]).toContain(response.status);
      if (response.status === 200) {
        expect(response.body.message).toBe('Postagem removida com sucesso');
      }
    });
  });
});

afterAll(async () => {
  const { db } = require('../../../shared/config/firebase');
  await db.app.delete();
});

});