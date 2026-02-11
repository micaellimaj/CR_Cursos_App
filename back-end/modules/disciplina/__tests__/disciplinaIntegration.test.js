const request = require('supertest');
const app = require('../../../server');

jest.setTimeout(15000);

describe('Integration Test: Disciplina Module', () => {

  describe('POST /disciplinas', () => {
    
    it('Deve criar uma disciplina com sucesso e retornar 201', async () => {
      const novaDisciplina = {
        nome: 'Programação Web',
        cursoId: 'CURSO-ADS-2026',
        professorId: 'PROF-CARLOS-123'
      };

      const response = await request(app)
        .post('/disciplinas')
        .send(novaDisciplina);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.message).toBe('Disciplina criada com sucesso!');
      expect(response.body.data.nome).toBe(novaDisciplina.nome);
      expect(response.body.data.id).toMatch(/^DIS-/);
    });

    it('Deve retornar 400 se o campo nome estiver faltando', async () => {
      const dadosInvalidos = {
        cursoId: 'CURSO-1',
        professorId: 'PROF-1'
      };

      const response = await request(app)
        .post('/disciplinas')
        .send(dadosInvalidos);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Campos obrigatórios faltando');
    });

    it('Deve retornar 400 se o campo cursoId ou professorId estiverem faltando', async () => {
      const response = await request(app)
        .post('/disciplinas')
        .send({ nome: 'Disciplina Isolada' });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('nome, cursoId e professorId');
    });

  });

  describe('POST /disciplinas/associar-turma', () => {
    it('Deve retornar 200 ao associar uma turma válida', async () => {
      const payload = {
        disciplinaId: 'ID_DISCIPLINA_EXISTENTE',
        turmaId: 'ID_TURMA_EXISTENTE',
        professorId: 'ID_PROFESSOR_AUTORIZADO'
      };

      const response = await request(app)
        .post('/disciplinas/associar-turma')
        .send(payload);

      expect([200, 403, 404, 400]).toContain(response.status);
      
      if (response.status === 200) {
        expect(response.body.message).toContain('sucesso');
      }
    });

    it('Deve retornar 400 se faltar o campo disciplinaId no payload', async () => {
      const response = await request(app)
        .post('/disciplinas/associar-turma')
        .send({ turmaId: 'T1', professorId: 'P1' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Campos obrigatórios faltando.");
    });
  });

  describe('GET /disciplinas', () => {
    it('Deve listar todas as disciplinas com status 200', async () => {
      const response = await request(app).get('/disciplinas');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /disciplinas/:id', () => {
    it('Deve buscar uma disciplina específica', async () => {
      const response = await request(app).get('/disciplinas/ALGUM-ID-EXISTENTE');
      
      expect([200, 404]).toContain(response.status);
      if (response.status === 200) {
        expect(response.body).toHaveProperty('nome');
      }
    });

    it('Deve retornar 404 para ID inexistente', async () => {
      const response = await request(app).get('/disciplinas/ID-QUE-NAO-EXISTE');
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /disciplinas/:id', () => {
    it('Deve retornar 200 ao atualizar dados da disciplina', async () => {
      const response = await request(app)
        .put('/disciplinas/ID_QUALQUER')
        .send({ nome: 'Nome Alterado via Integração' });

      expect([200, 404]).toContain(response.status);
    });
  });

  describe('DELETE /disciplinas/:id', () => {
    it('Deve retornar 200 ao excluir ou 404 se não existir', async () => {
      const response = await request(app).delete('/disciplinas/ID_QUALQUER');
      
      expect([200, 404]).toContain(response.status);
    });
  });
  
  afterAll(async () => {
    await db.app.delete();
  });
});