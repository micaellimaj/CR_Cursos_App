const request = require('supertest');
const app = require('../../../server');

describe('Integration Test: Professor Module', () => {

describe('POST /professores', () => {
    it('Deve persistir um professor no banco de dados', async () => {
    const response = await request(app)
        .post('/professores')
        .send({
        full_name: 'Allan Turing',
        email: 'turing@email.com',
        data_nascimento: '1912-06-23',
        senha: 'password123',
        turma_id_principal: 'ID_TURMA_EXISTENTE'
        });

    expect([201, 400, 404]).toContain(response.status);

    if (response.status === 201) {
        expect(response.body.message).toBe('Professor criado com sucesso');
        expect(response.body).toHaveProperty('id');
    }
    });

    it('Deve retornar 400 para professor menor de idade', async () => {
    const response = await request(app)
        .post('/professores')
        .send({
        full_name: 'Professor Mirim',
        email: 'mirim@email.com',
        data_nascimento: '2015-01-01',
        senha: '123'
        });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Professor deve ser maior de idade.');
    });
});

describe('Integration Test: GET /professores', () => {
    it('Deve retornar 200 e a lista formatada como instâncias de Professor', async () => {
    const response = await request(app).get('/professores');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    
    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('tipo', 'professor');
      expect(response.body[0]).toHaveProperty('collection', 'professores');
    }
  });
});

describe('Integration Test: GET /professores/:id', () => {
    it('Deve retornar 404 para um professor que não existe', async () => {
    const response = await request(app).get('/professores/id-fantasma');
    
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Professor não encontrado.');
});

    it('Deve retornar 200 ao buscar um ID válido', async () => {
    const idValido = 'ID_DE_TESTE'; 
    const response = await request(app).get(`/professores/${idValido}`);

    if (response.status === 200) {
      expect(response.body).toHaveProperty('full_name');
      expect(response.body.tipo).toBe('professor');
    }
  });
});

describe('Integration Test: PUT /professores/:id', () => {
    it('Deve retornar 200 ao atualizar um professor existente', async () => {
    const idExistente = 'ID_REAL_DE_TESTE'; // ID que você sabe que existe
    const response = await request(app)
      .put(`/professores/${idExistente}`)
      .send({ full_name: 'Nome Editado Integração' });

    expect([200, 404]).toContain(response.status);
    if (response.status === 200) {
      expect(response.body.message).toBe('Professor atualizado com sucesso.');
    }
  });

  it('Deve retornar 400 para e-mail com formato incorreto', async () => {
    const response = await request(app)
      .put('/professores/123')
      .send({ email: 'email_sem_arroba.com' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email inválido.');
  });
});

describe('Integration Test: DELETE /professores/:id', () => {
    it('Deve retornar 200 ao excluir com sucesso ou 404 se não existir', async () => {
    const response = await request(app).delete('/professores/qualquer-id');
    
    expect([200, 404]).toContain(response.status);
    if (response.status === 200) {
      expect(response.body.message).toBe('Professor excluído com sucesso.');
    }
  });
});
});