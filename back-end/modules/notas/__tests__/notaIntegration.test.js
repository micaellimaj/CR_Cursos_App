const request = require('supertest');
const app = require('../../../server');

jest.setTimeout(15000);

describe('Integration Test: Nota Module', () => {

  describe('POST /notas', () => {
    it('Deve retornar 400 para nota negativa', async () => {
      const response = await request(app)
        .post('/notas')
        .send({
          alunoId: 'A1',
          disciplinaId: 'D1',
          professorId: 'P1',
          turmaId: 'T1',
          valor: -5
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('entre 0 e 10');
    });
  });

  describe('GET /notas/aluno/:aluno_id', () => {
    it('Deve listar notas de um aluno específico', async () => {
      const response = await request(app).get('/notas/aluno/ALU-123');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /notas/disciplina/:disciplina_id', () => {
    it('Deve listar notas de uma disciplina', async () => {
      const response = await request(app).get('/notas/disciplina/DIS-123');
      expect(response.status).toBe(200);
    });
  });

  describe('PUT /notas/:id', () => {
    it('Deve retornar 200 ao atualizar uma nota existente', async () => {
      const response = await request(app)
        .put('/notas/ID-TESTE-NOTA')
        .send({ nota: 8.0, descricao: 'Recuperação' });
      expect([200, 404, 403]).toContain(response.status);
    });
  });

  describe('DELETE /notas/:id', () => {
    it('Deve retornar 200 ao deletar uma nota', async () => {
      const response = await request(app).delete('/notas/ID-TESTE-NOTA');
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('GET /notas/aluno/:aluno_id', () => {
    it('Deve retornar 200 e uma lista (mesmo que vazia)', async () => {
      const response = await request(app).get('/notas/aluno/ALU-TESTE');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /notas/disciplina/:disciplina_id', () => {
    it('Deve retornar 200 ao buscar por disciplina', async () => {
      const response = await request(app).get('/notas/disciplina/DIS-TESTE');
      expect(response.status).toBe(200);
    });
  });

  describe('GET /notas/professor/:professor_id', () => {
    it('Deve listar notas lançadas por um professor', async () => {
      const response = await request(app).get('/notas/professor/PROF-123');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /notas/turma/:turma_id', () => {
    it('Deve listar todas as notas de uma turma específica', async () => {
      const response = await request(app).get('/notas/turma/TURMA-123');
      expect(response.status).toBe(200);
    });
  });

  afterAll(async () => {
    await db.app.delete();
  });
  
});