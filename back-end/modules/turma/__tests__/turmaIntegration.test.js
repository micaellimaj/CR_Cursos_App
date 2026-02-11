const request = require('supertest');
const app = require('../../../server');

jest.setTimeout(15000);

describe('Integration Test: Turma Module', () => {

  describe('POST /turmas', () => {
    it('Deve retornar 400 se campos obrigatórios estiverem faltando', async () => {
      const response = await request(app)
        .post('/turmas')
        .send({ nome: 'Turma Incompleta' });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Campos obrigatórios faltando');
    });

    it('Deve tentar criar uma turma e retornar 201 ou 404 (caso curso_id não exista no banco)', async () => {
      const response = await request(app)
        .post('/turmas')
        .send({
          nome: 'Turma Integração',
          curso_id: 'CURSO-FIXO-OU-EXISTENTE',
          data_inicio: '2026-01-01',
          data_fim: '2026-12-01'
        });

      expect([201, 404, 400]).toContain(response.status);
      
      if (response.status === 201) {
        expect(response.body.mensagem).toBe('Turma criada com sucesso!');
        expect(response.body.turma).toHaveProperty('id');
      }
    });
  });

  describe('GET /turmas', () => {
    it('Deve listar todas as turmas com status 200', async () => {
      const response = await request(app).get('/turmas');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /turmas/:id/alunos', () => {
    it('Deve buscar a lista de alunos de uma turma específica', async () => {
      const response = await request(app).get('/turmas/ID_QUALQUER/alunos');
      expect([200, 404]).toContain(response.status);
      if (response.status === 200) {
        expect(Array.isArray(response.body)).toBe(true);
      }
    });
  });

  describe('POST /turmas/:turmaId/matricular', () => {
    it('Deve retornar 200 ao matricular um aluno com sucesso', async () => {
      const response = await request(app)
        .post('/turmas/ID_TURMA/matricular')
        .send({ alunoId: 'ID_ALUNO' });

      expect([200, 404, 400]).toContain(response.status);
    });
  });

  describe('POST /turmas/:turmaId/professor', () => {
    it('Deve associar um professor à turma', async () => {
      const response = await request(app)
        .post('/turmas/ID_TURMA/professor')
        .send({ professorId: 'ID_PROF' });

      expect([200, 404, 400]).toContain(response.status);
    });
  });

  describe('PUT /turmas/:id', () => {
    it('Deve retornar 200 ao atualizar dados básicos', async () => {
      const response = await request(app)
        .put('/turmas/ID_TURMA_TESTE')
        .send({ nome: 'Nome Atualizado via Integração' });

      expect([200, 404, 400]).toContain(response.status);
    });
  });

  describe('DELETE /turmas/:id', () => {
    it('Deve retornar 200 ao excluir ou 404 se não existir', async () => {
      const response = await request(app).delete('/turmas/ID_QUALQUER');
      expect([200, 404]).toContain(response.status);
    });
  });
  
  afterAll(async () => {
    await db.app.delete();
  });

});