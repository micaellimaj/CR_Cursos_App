const { db } = require('../config/firebase');

// Criar novo Professor
const createProfessor = async (req, res) => {
  const { 
    first_name,
    last_name, 
    email,
    cpf: hashedCpf,
    senha: hashedSenha,
    confirmarSenha,
    telefone,
    instagram,
    endereco,
    data_nascimento, 
  } = req.body;

  if (!first_name || !email || !senha || 'undefined') {
    return res.status(400).send('Campos obrigatórios faltando');
  }

  if (senha !== confirmarSenha) {
    return res.status(400).send('As senhas não coincidem');
  }
 
  try {
    const hashedSenha = await bcrypt.hash(senha, 10);
    const hashedCpf = cpf ? await bcrypt.hash(cpf, 10) : null;
    const ref = db.ref('professores').push();
    await ref.set({
      first_name,
      last_name,
      email,
      created_at: new Date().toISOString()
    });

    res.status(201).send({ id: ref.key, message: 'Professor criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar professor:', error);
    res.status(500).send('Erro interno');
  }
};

// Listar todos os Professores
const getAllProfessores = async (req, res) => {
  try {
    const snapshot = await db.ref('professores').once('value');
    const data = snapshot.val() || {};

    const professores = Object.entries(data).map(([id, value]) => ({
      id,
      ...value
    }));

    res.status(200).send(professores);
  } catch (error) {
    console.error('Erro ao buscar professores:', error);
    res.status(500).send('Erro interno');
  }
};

// Obter Professor por ID
const getProfessorById = async (req, res) => {
  const { id } = req.params;

  try {
    const snapshot = await db.ref(`professores/${id}`).once('value');
    if (!snapshot.exists()) {
      return res.status(404).send('Professor não encontrado');
    }

    res.status(200).send({ id, ...snapshot.val() });
  } catch (error) {
    console.error('Erro ao buscar professor:', error);
    res.status(500).send('Erro interno');
  }
};

// Atualizar Professor
const updateProfessor = async (req, res) => {
  const { id } = req.params;
  const dados = req.body;

  try {
    await db.ref(`professores/${id}`).update(dados);
    res.status(200).send('Professor atualizado com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar professor:', error);
    res.status(500).send('Erro interno');
  }
};

// Deletar Professor
const deleteProfessor = async (req, res) => {
  const { id } = req.params;

  try {
    await db.ref(`professores/${id}`).remove();
    res.status(200).send('Professor excluído com sucesso');
  } catch (error) {
    console.error('Erro ao excluir professor:', error);
    res.status(500).send('Erro interno');
  }
};

module.exports = {
  createProfessor,
  getAllProfessores,
  getProfessorById,
  updateProfessor,
  deleteProfessor
};
