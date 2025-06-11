const bcrypt = require('bcryptjs');
const calcularIdade = require('../utils/aluno/calcularIdade');
const validarEmail = require('../utils/aluno/validarEmail');
const { db } = require('../config/firebase');
const {
  emailExiste,
  criarAluno,
  getTodosAlunos,
  getAlunoPorId,
  atualizarAluno,
  deletarAluno
} = require('../services/alunoService');

// Criar novo Aluno
const createAluno = async (req, res) => {
  console.log('--- INÍCIO DA REQUISIÇÃO createAluno ---'); // NOVO LOG
  console.log('Dados recebidos no backend (createAluno):', req.body);
  console.log('Usuário autenticado (req.user):', req.user);
  const {
    full_name,
    email,
    senha,
    confirmarSenha,
    nome_responsavel,
    email_responsavel,
    telefone_responsavel,
    telefone,
    data_nascimento
  } = req.body;

  
  
  // --- CORREÇÃO: Usando .json() para todas as respostas de erro ---
  if (!full_name || !email || !senha || !data_nascimento) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando' });
  }

  if (!validarEmail(email)) {
    return res.status(400).send('Email inválido');
  }

  // --- ADICIONE ESTA VALIDAÇÃO: VERIFICA SE A IDADE É NaN ---
  console.log('Data de Nascimento recebida no controller:', data_nascimento);
  const idade = calcularIdade(data_nascimento);
  console.log('Idade calculada no controller:', idade);
  console.log('isNaN(idade) no controller:', isNaN(idade));
  if (isNaN(idade)) {
    console.error('ERRO: Idade é NaN no controller! Retornando 400.'); // NOVO LOG MAIS CLARO
    return res.status(400).json({ message: 'Data de nascimento inválida. Use o formato DD/MM/AAAA.' });
  }

  const idade = calcularIdade(data_nascimento);

  if (idade < 18 && (!nome_responsavel || !email_responsavel || !telefone_responsavel)) {
    return res.status(400).send('Responsável obrigatório para menores de idade');
  }

  try {
    if (await emailExiste(email)) {
      return res.status(400).send('Já existe um aluno com esse e-mail');
    }
    console.log('Chamando service.criarAluno...');
    const customId = await criarAluno({
      full_name,
      email,
      senha,
      data_nascimento,
      nome_responsavel,
      email_responsavel,
      telefone_responsavel,
      telefone: telefone || null
    });
    console.log('Aluno criado com sucesso pelo controller. ID:', customId); // NOVO LOG
        res.status(201).json({ id: customId, message: 'Aluno criado com sucesso' });
    } catch (error) {
        console.error('ERRO GERAL NO createAluno do controller:', error); // LOG GERAL DO CATCH
        res.status(500).json({ message: 'Erro interno do servidor ao criar aluno' });
    }
    console.log('--- FIM DA REQUISIÇÃO createAluno ---'); // NOVO LOG
};

// Buscar todos os alunos
const getAllAlunos = async (req, res) => {
  try {
    const alunos = await getTodosAlunos();
    res.status(200).json(alunos);
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    res.status(500).send('Erro ao buscar alunos');
  }
};

// Buscar aluno por ID
const getAlunoById = async (req, res) => {
  const { id } = req.params;

  try {
    const aluno = await getAlunoPorId(id);
    if (!aluno) return res.status(404).send('Aluno não encontrado');
    res.status(200).json({ id, ...aluno });
  } catch (error) {
    console.error('Erro ao buscar aluno:', error);
    res.status(500).send('Erro ao buscar aluno');
  }
};

// Atualizar aluno
const updateAluno = async (req, res) => {
  const { id } = req.params;
  const novosDados = req.body;

  if (novosDados.email && !validarEmail(novosDados.email)) {
    return res.status(400).send('Email inválido');
  }

  if (novosDados.data_nascimento) {
    const idade = calcularIdade(novosDados.data_nascimento);
    if (idade < 18 && (!novosDados.nome_responsavel || !novosDados.email_responsavel || !novosDados.telefone_responsavel)) {
      return res.status(400).send('Dados do responsável são obrigatórios para menores de idade');
    }
  }

  try {
    const sucesso = await atualizarAluno(id, novosDados);
    if (!sucesso) return res.status(404).send('Aluno não encontrado');
    res.status(200).send('Aluno atualizado com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar aluno:', error);
    res.status(500).send('Erro ao atualizar aluno');
  }
};

// Deletar aluno
const deleteAluno = async (req, res) => {
  const { id } = req.params;

  try {
    const sucesso = await deletarAluno(id);
    if (!sucesso) return res.status(404).send('Aluno não encontrado');
    res.status(200).send('Aluno removido com sucesso');
  } catch (error) {
    console.error('Erro ao deletar aluno:', error);
    res.status(500).send('Erro ao deletar aluno');
  }
};

module.exports = {
  createAluno,
  getAllAlunos,
  getAlunoById,
  updateAluno,
  deleteAluno
};