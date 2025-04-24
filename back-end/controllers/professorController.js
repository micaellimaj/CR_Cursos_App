const { db } = require('../config/firebase');
const bcrypt = require('bcryptjs');

// Gerar ID personalizado para professor
const gerarIdProfessor = () => {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const aleatorio = Math.floor(100000 + Math.random() * 900000);
  return `PROF${ano}${mes}${aleatorio}`;
};

// Criar novo Professor
const createProfessor = async (req, res) => {
  const { 
    full_name,
    email,
    senha,
    confirmarSenha,
    telefone,
    data_nascimento
  } = req.body;

  if (!full_name || !email || !senha || !confirmarSenha) {
    return res.status(400).send('Campos obrigatórios faltando');
  }

  if (senha !== confirmarSenha) {
    return res.status(400).send('As senhas não coincidem');
  }

  try {
    const hashedSenha = await bcrypt.hash(senha, 10);
    const customId = gerarIdProfessor();

    await db.ref(`professores/${customId}`).set({
      full_name,
      email,
      senha: hashedSenha,
      telefone: telefone || null,
      data_nascimento: data_nascimento || null,
      created_at: new Date().toISOString()
    });

    res.status(201).send({ id: customId, message: 'Professor criado com sucesso' });
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

    const professores = Object.entries(data).map(([id, value]) => {
      const { senha, ...resto } = value;
      return { id, ...resto };
    });

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

    const { senha, ...resto } = snapshot.val();
    res.status(200).send({ id, ...resto });
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
    if (dados.senha) {
      dados.senha = await bcrypt.hash(dados.senha, 10);
    }

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
