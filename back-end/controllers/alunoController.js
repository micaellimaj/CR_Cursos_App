const { db } = require('../config/firebase');

// Criar novo Aluno
const createAluno = async (req, res) => {
  const { first_name, last_name, email } = req.body;

  try {
    const newAlunoRef = db.ref('alunos').push(); 
    await newAlunoRef.set({
      first_name,
      last_name,
      email,
      created_at: new Date().toISOString()
    });

    res.status(201).send({ id: newAlunoRef.key, message: 'Aluno criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar aluno:', error);
    res.status(500).send('Erro interno');
  }
};

// Retornar todos os Alunos
const getAllAlunos = async (req, res) => {
  try {
    const snapshot = await db.ref('alunos').once('value');
    const data = snapshot.val();

    if (!data) return res.status(200).send([]);

    const alunos = Object.keys(data).map(id => ({ id, ...data[id] }));
    res.status(200).send(alunos);
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    res.status(500).send('Erro interno');
  }
};

// Retornar Aluno por ID
const getAlunoById = async (req, res) => {
  const { id } = req.params;

  try {
    const snapshot = await db.ref(`alunos/${id}`).once('value');
    const aluno = snapshot.val();

    if (!aluno) {
      return res.status(404).send('Aluno não encontrado');
    }

    res.status(200).send({ id, ...aluno });
  } catch (error) {
    console.error('Erro ao buscar aluno por ID:', error);
    res.status(500).send('Erro interno');
  }
};

// Atualizar Aluno
const updateAluno = async (req, res) => {
  const { id } = req.params;
  const dados = req.body;

  try {
    await db.ref(`alunos/${id}`).update(dados);
    res.status(200).send('Aluno atualizado com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar aluno:', error);
    res.status(500).send('Erro interno');
  }
};

// Deletar Aluno
const deleteAluno = async (req, res) => {
  const { id } = req.params;

  try {
    await db.ref(`alunos/${id}`).remove();
    res.status(200).send('Aluno excluído com sucesso');
  } catch (error) {
    console.error('Erro ao excluir aluno:', error);
    res.status(500).send('Erro interno');
  }
};

module.exports = {
  createAluno,
  getAllAlunos,
  getAlunoById,
  updateAluno,
  deleteAluno
};
