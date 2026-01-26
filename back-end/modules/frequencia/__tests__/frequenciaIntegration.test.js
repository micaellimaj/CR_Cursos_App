const request = require('supertest');
const app = require('../../../server');

describe('Integration Test: Frequencia Module', () => {

  describe('POST /frequencia', () => {
    it('Deve retornar 400 para formato de data inválido', async () => {
      const response = await request(app)
        .post('/frequencia')
        .send({
          turma_id: 'T1',
          disciplina_id: 'D1',
          professor_id: 'P1',
          data: '2024-05-20',
          alunos: [{ aluno_id: 'A1', status: true }]
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('formato da data deve ser DD/MM/AAAA');
    });

    it('Deve registrar chamada com sucesso', async () => {
      const response = await request(app)
        .post('/frequencia')
        .send({
          turma_id: 'TURMA-01',
          disciplina_id: 'DISC-01',
          professor_id: 'PROF-01',
          data: '20/05/2024',
          alunos: [
            { aluno_id: 'ALUNO-01', status: true },
            { aluno_id: 'ALUNO-02', status: false }
          ]
        });
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Chamada registrada com sucesso!');
    });
  });

  describe('GET /frequencia/aluno/:alunoId', () => {
    it('Deve retornar 200 e o objeto com resumo e historico', async () => {
      const response = await request(app).get('/frequencia/aluno/ALU-TESTE');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('resumo');
      expect(response.body).toHaveProperty('historico');
      expect(typeof response.body.resumo.presencas).toBe('number');
    });
  });

  describe('GET /frequencia/turma/:turmaId', () => {
    it('Deve retornar 200 se encontrar dados ou 404 se estiver vazia', async () => {
      const response = await request(app).get('/frequencia/turma/TURMA-TESTE');
      expect([200, 404]).toContain(response.status);
    });
  });

  describe('PUT /frequencia/:id', () => {
    it('Deve atualizar o status de uma frequência', async () => {
      const response = await request(app)
        .put('/frequencia/ID-EXISTENTE')
        .send({ status: false });

      expect([200, 404]).toContain(response.status);
      
      if (response.status === 200) {
        expect(response.body.message).toBe('Frequência atualizada com sucesso.');
      }
    });
  });

  describe('DELETE /frequencia/:id', () => {
    it('Deve deletar uma frequência ou retornar 404', async () => {
      const response = await request(app).delete('/frequencia/ID-EXISTENTE');

      expect([200, 404]).toContain(response.status);

      if (response.status === 200) {
        expect(response.body.message).toBe('Registro de frequência excluído com sucesso.');
      }
    });
  });

});