const { db } = require('../config/firebase');

// Criar novo Aluno
const createAluno = async (req, res) => {
  const { first_name, last_name, email } = req.body;

  try {
    const alunoRef = db.collection('alunos').doc();
    await alunoRef.set({
      first_name,
      last_name,
      email,
      created_at: new Date()
    });

    res.status(201).send({ id: alunoRef.id, message: 'Aluno criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar aluno:', error);
    res.status(500).send('Erro interno');
  }
};

module.exports = { createAluno };

// Retornar todos os Alunos

// Retornar Aluno por ID



// Atualizar Aluno

// Deletar Aluno