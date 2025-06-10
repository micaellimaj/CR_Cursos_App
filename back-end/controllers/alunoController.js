const bcrypt = require('bcryptjs');
const calcularIdade = require('../utils/aluno/calcularIdade');
const validarEmail = require('../utils/aluno/validarEmail');
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
  console.log('Dados recebidos no backend:', req.body);
  const {
    full_name,
    email,
    senha,
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
    return res.status(400).json({ message: 'Email inválido' });
  }

  // --- ADICIONE ESTA VALIDAÇÃO: VERIFICA SE A IDADE É NaN ---
  const idade = calcularIdade(data_nascimento);
  if (isNaN(idade)) {
    return res.status(400).json({ message: 'Data de nascimento inválida. Use o formato DD/MM/AAAA.' });
  }
  // --- FIM DA ADIÇÃO ---

  if (idade < 18 && (!nome_responsavel || !email_responsavel || !telefone_responsavel)) {
    return res.status(400).json({ message: 'Responsável obrigatório para menores de idade' });
  }

  try {
    if (await emailExiste(email)) {
      return res.status(400).json({ message: 'Já existe um aluno com esse e-mail' });
    }

    const customId = await criarAluno({
      full_name,
      email,
      senha,
      data_nascimento,
      nome_responsavel,
      email_responsavel,
      telefone_responsavel,
      telefone: telefone || null // Garante que 'telefone' é enviado, mesmo que seja null
    });

    res.status(201).json({ id: customId, message: 'Aluno criado com sucesso' }); // Resposta de sucesso já era JSON
  } catch (error) {
    console.error('Erro ao criar aluno:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao criar aluno' }); // --- CORREÇÃO AQUI TAMBÉM ---
  }
};

// Buscar todos os alunos
const getAllAlunos = async (req, res) => {
  try {
    const alunos = await getTodosAlunos();
    res.status(200).json(alunos);
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    res.status(500).json({ message: 'Erro ao buscar alunos' }); // --- CORREÇÃO AQUI ---
  }
};

// Buscar aluno por ID
const getAlunoById = async (req, res) => {
  const { id } = req.params;

  try {
    const aluno = await getAlunoPorId(id);
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' }); // --- CORREÇÃO AQUI ---
    res.status(200).json({ id, ...aluno });
  } catch (error) {
    console.error('Erro ao buscar aluno:', error);
    res.status(500).json({ message: 'Erro ao buscar aluno' }); // --- CORREÇÃO AQUI ---
  }
};

// Atualizar aluno
const updateAluno = async (req, res) => {
  const { id } = req.params;
  const novosDados = req.body;

  if (novosDados.email && !validarEmail(novosDados.email)) {
    return res.status(400).json({ message: 'Email inválido' }); // --- CORREÇÃO AQUI ---
  }

  if (novosDados.data_nascimento) {
    const idade = calcularIdade(novosDados.data_nascimento);
    if (idade < 18 && (!novosDados.nome_responsavel || !novosDados.email_responsavel || !novosDados.telefone_responsavel)) {
      return res.status(400).json({ message: 'Dados do responsável são obrigatórios para menores de idade' }); // --- CORREÇÃO AQUI ---
    }
  }

  try {
    const sucesso = await atualizarAluno(id, novosDados);
    if (!sucesso) return res.status(404).json({ message: 'Aluno não encontrado' }); // --- CORREÇÃO AQUI ---
    res.status(200).json({ message: 'Aluno atualizado com sucesso' }); // --- CORREÇÃO AQUI ---
  } catch (error) {
    console.error('Erro ao atualizar aluno:', error);
    res.status(500).json({ message: 'Erro ao atualizar aluno' }); // --- CORREÇÃO AQUI ---
  }
};

// Deletar aluno
const deleteAluno = async (req, res) => {
  const { id } = req.params;

  try {
    const sucesso = await deletarAluno(id);
    if (!sucesso) return res.status(404).json({ message: 'Aluno não encontrado' }); // --- CORREÇÃO AQUI ---
    res.status(200).json({ message: 'Aluno removido com sucesso' }); // --- CORREÇÃO AQUI ---
  } catch (error) {
    console.error('Erro ao deletar aluno:', error);
    res.status(500).json({ message: 'Erro ao deletar aluno' }); // --- CORREÇÃO AQUI ---
  }
};

module.exports = {
  createAluno,
  getAllAlunos,
  getAlunoById,
  updateAluno,
  deleteAluno
};