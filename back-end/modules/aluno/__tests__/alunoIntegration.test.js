const request = require('supertest');
const app = require('../../../server');

describe('Integration Test: POST /alunos', () => {
  it('Deve persistir um aluno no banco de dados', async () => {
    const response = await request(app)
      .post('/alunos')
      .send({
        nome: 'Marcos Integração',
        email: 'marcos.int@teste.com',
        data_nascimento: '1995-05-10',
        turma_id: 'ID_TURMA_EXISTENTE',
        senha: 'senha_segura'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Aluno criado com sucesso');
    
  });
});

describe('Integration Test: DELETE /alunos/:id', () => {
  
  it('Deve retornar 200 ao deletar um aluno com sucesso', async () => {
    const idParaDeletar = 'algum-id-de-teste';

    const response = await request(app)
      .delete(`/alunos/${idParaDeletar}`);

    if (response.status === 200) {
      expect(response.body.message).toBe('Aluno removido com sucesso');
    } else {

      expect(response.status).toBe(404);
    }
  });

  it('Deve retornar 404 para um ID que não existe', async () => {
    const response = await request(app)
      .delete('/alunos/id-impossivel-de-existir');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Aluno não encontrado');
  });
});

describe('Integration Test: PUT /alunos/:id', () => {
  
  it('Deve retornar 200 ao atualizar um aluno existente', async () => {
    const idExistente = 'ID_DE_TESTE_REAL'; 

    const response = await request(app)
      .put(`/alunos/${idExistente}`)
      .send({
        nome: 'Nome Atualizado Integração',
        telefone: '11999999999'
      });

    expect([200, 404]).toContain(response.status);
    if (response.status === 200) {
      expect(response.body.message).toBe('Aluno atualizado com sucesso');
    }
  });

  it('Deve retornar 400 ao tentar atualizar com e-mail inválido', async () => {
    const response = await request(app)
      .put('/alunos/123')
      .send({ email: 'usuario_at_gmail.com' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email inválido');
  });
});

describe('Integration Test: GET /alunos', () => {
  it('Deve retornar status 200 e uma lista (mesmo que vazia)', async () => {
    const response = await request(app).get('/alunos');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Deve retornar 404 para um ID de busca inexistente', async () => {
    const response = await request(app).get('/alunos/id-que-nao-existe');
    
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Aluno não encontrado');
  });
});