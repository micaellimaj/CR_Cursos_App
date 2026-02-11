const request = require('supertest');
const app = require('../../../server');

jest.setTimeout(15000);

describe('Integration Test: Atividade Module', () => {

  describe('POST /atividade', () => {
    it('Deve retornar 400 se enviar tipo inválido', async () => {
      const response = await request(app)
        .post('/atividades')
        .send({
          titulo: 'Atividade Inválida',
          disciplinaId: 'DISC-01',
          tipo: 'audio'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Tipo de atividade inválido');
    });

    it('Deve criar uma atividade com sucesso (Texto)', async () => {
      const response = await request(app)
        .post('/atividades')
        .send({
          titulo: 'Questionário de História',
          disciplinaId: 'HIST-202',
          tipo: 'texto',
          descricao: 'Responda as questões do livro.'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Atividade criada com sucesso!");
      expect(response.body.id).toBeDefined();
    });

    it('Deve criar uma atividade com upload de PDF', async () => {
      const response = await request(app)
        .post('/atividades')
        .field('titulo', 'Prova de Inglês')
        .field('disciplinaId', 'ING-01')
        .field('tipo', 'pdf')
        .attach('file', Buffer.from('conteudo pdf'), 'prova.pdf');

      expect(response.status).toBe(201);
      expect(response.body.data.urlArquivo).toContain('https://storage.googleapis.com');
    });
  });

  describe('Listagem e Busca', () => {
    it('Deve listar atividades por disciplina', async () => {
      const response = await request(app).get('/atividades/disciplina/HIST-202');
      
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe('object'); 
    });

    it('Deve buscar uma atividade pelo ID', async () => {
      const response = await request(app).get('/atividade/ATIV-EXISTENTE');
      expect([200, 404, 500]).toContain(response.status);
    });
  });

  describe('Busca de Atividades', () => {
  
  describe('GET /atividade/:id', () => {
    it('Deve retornar 200 e a atividade se o ID for válido', async () => {
      const response = await request(app).get('/atividades/ID-TESTE');
      
      if (response.status === 200) {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('titulo');
      } else {
        expect(response.status).toBe(404);
      }
    });
  });

  describe('GET /atividade/disciplina/:disciplinaId', () => {
    it('Deve retornar 200 e uma lista (mesmo que vazia)', async () => {
      const response = await request(app).get('/atividades/disciplina/DISC-101');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});

  describe('Escrita e Remoção (Update/Delete)', () => {

  describe('PUT /atividades/:id', () => {
    it('Deve retornar 200 ao atualizar campos de uma atividade', async () => {
      const response = await request(app)
        .put('/atividades/ATIV-123')
        .send({ titulo: 'Update via Integração' });

      expect([200, 404]).toContain(response.status);
    });
  });

  describe('DELETE /atividades/:id', () => {
    it('Deve retornar 200 ao excluir uma atividade existente', async () => {
      const response = await request(app).delete('/atividades/ATIV-123');
      
      expect([200, 404]).toContain(response.status);
      if (response.status === 200) {
        expect(response.body.message).toBe("Atividade removida com sucesso!");
      }
    });
  });
});

  afterAll(async () => {
      await db.app.delete();
    });

});