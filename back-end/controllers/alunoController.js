const { db } = require('../config/firebase');
const bcrypt = require('bcryptjs');

// Função para gerar ID personalizado
const gerarIdPersonalizado = () => {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, '0'); 
  const aleatorio = Math.floor(100000 + Math.random() * 900000); 
  return `${ano}${mes}${aleatorio}`;
};


// Criar novo Aluno
const createAluno = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    cpf,
    senha,
    confirmarSenha,
    menor_de_idade,
    nome_responsavel,
    telefone_responsavel,
    telefone,
    instagram,
    endereco,
    data_nascimento
  } = req.body;

  if (!first_name || !email || !senha || typeof menor_de_idade === 'undefined') {
    return res.status(400).send('Campos obrigatórios faltando');
  }

  if (senha !== confirmarSenha) {
    return res.status(400).send('As senhas não coincidem');
  }

  try {
    const hashedSenha = await bcrypt.hash(senha, 10);
    const hashedCpf = cpf ? await bcrypt.hash(cpf, 10) : null;

    const customId = gerarIdPersonalizado();

    await db.ref(`alunos/${customId}`).set({
      first_name,
      last_name,
      email,
      cpf: hashedCpf,
      senha: hashedSenha,
      menor_de_idade,
      nome_responsavel: menor_de_idade === 'sim' ? nome_responsavel : null,
      telefone_responsavel: menor_de_idade === 'sim' ? telefone_responsavel : null,
      telefone: telefone || null,
      instagram: instagram || null,
      endereco: endereco || null,
      data_nascimento: data_nascimento || null,
      created_at: new Date().toISOString()
    });

    res.status(201).send({ id: customId, message: 'Aluno criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar aluno:', error);
    res.status(500).send('Erro interno');
  }
};

// Retornar todos os Alunos (sem senha e cpf)
const getAllAlunos = async (req, res) => {
  try {
    const snapshot = await db.ref('alunos').once('value');
    const data = snapshot.val();

    if (!data) return res.status(200).send([]);

    const alunos = Object.keys(data).map(id => {
      const aluno = data[id];
      delete aluno.senha;
      delete aluno.cpf;
      return { id, ...aluno };
    });

    res.status(200).send(alunos);
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    res.status(500).send('Erro interno');
  }
};

// Retornar Aluno por ID (sem senha e cpf)
const getAlunoById = async (req, res) => {
  const { id } = req.params;

  try {
    const snapshot = await db.ref(`alunos/${id}`).once('value');
    const aluno = snapshot.val();

    if (!aluno) {
      return res.status(404).send('Aluno não encontrado');
    }

    delete aluno.senha;
    delete aluno.cpf;
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
    if (dados.senha) {
      dados.senha = await bcrypt.hash(dados.senha, 10);
    }
    if (dados.cpf) {
      dados.cpf = await bcrypt.hash(dados.cpf, 10);
    }

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