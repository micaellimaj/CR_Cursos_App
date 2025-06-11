const {
  createProfessorService,
  getAllProfessoresService,
  getProfessorByIdService,
  updateProfessorService,
  deleteProfessorService
} = require('../services/professorService');

const validarEmail = require('../utils/aluno/validarEmail'); // Reutilize a função de validação de email
const calcularIdade = require('../utils/aluno/calcularIdade'); // Reutilize a função de calcular idade

// Criar novo Professor
const createProfessor = async (req, res) => {
  console.log('Dados recebidos no backend (Professor):', req.body); // Log para depuração
  const {
    full_name,
    email,
    senha,
    telefone,
    data_nascimento // Adicione data_nascimento aqui
  } = req.body;

  // 1. Validação de campos obrigatórios
  if (!full_name || !email || !senha || !data_nascimento) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando: nome completo, email, senha, data de nascimento.' });
  }

  // 2. Validação de e-mail
  if (!validarEmail(email)) {
    return res.status(400).json({ message: 'Email inválido.' });
  }

  // 3. Validação da data de nascimento e cálculo da idade (como no aluno)
  const idade = calcularIdade(data_nascimento);
  if (isNaN(idade)) {
    return res.status(400).json({ message: 'Data de nascimento inválida. Use o formato DD/MM/AAAA.' });
  }
  // Se quiser, pode adicionar validação de idade mínima para professor, e.g., if (idade < 18) { return res.status(400).json({ message: 'Professor deve ser maior de idade.' }); }

  try {
    // Passa apenas os dados necessários para o service
    const id = await createProfessorService({
      full_name,
      email,
      senha,
      telefone: telefone || null, // Garante que é null se não fornecido
      data_nascimento,
      idade // Passa a idade calculada para o service salvar
    });
    res.status(201).json({ id, message: 'Professor criado com sucesso.' });
  } catch (error) {
    console.error('Erro ao criar professor:', error.message);
    // Erros do service (como email já existente) serão capturados aqui
    // Se o service lançar um erro com uma mensagem específica, podemos usá-la.
    if (error.message.includes('Já existe um professor com esse e-mail')) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Erro interno do servidor ao criar professor.' });
  }
};

// Buscar todos os Professores
const getAllProfessores = async (req, res) => {
  try {
    const professores = await getAllProfessoresService();
    res.status(200).json(professores);
  } catch (error) {
    console.error('Erro ao buscar professores:', error);
    res.status(500).json({ message: 'Erro ao buscar professores.' });
  }
};

// Buscar Professor por ID
const getProfessorById = async (req, res) => {
  try {
    const professor = await getProfessorByIdService(req.params.id);
    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado.' });
    }
    res.status(200).json(professor);
  } catch (error) {
    console.error('Erro ao buscar professor:', error);
    res.status(500).json({ message: 'Erro ao buscar professor.' });
  }
};

// Atualizar Professor
const updateProfessor = async (req, res) => {
  const { id } = req.params;
  const novosDados = req.body;

  // Validação de e-mail na atualização, se fornecido
  if (novosDados.email && !validarEmail(novosDados.email)) {
    return res.status(400).json({ message: 'Email inválido.' });
  }

  // Validação da data de nascimento na atualização, se fornecida
  if (novosDados.data_nascimento) {
    const idade = calcularIdade(novosDados.data_nascimento);
    if (isNaN(idade)) {
      return res.status(400).json({ message: 'Data de nascimento inválida para atualização. Use o formato DD/MM/AAAA.' });
    }
    // Adicionar idade aos dados para o service atualizar
    novosDados.idade = idade;
  }

  try {
    const updated = await updateProfessorService(id, novosDados);
    if (!updated) {
      return res.status(404).json({ message: 'Professor não encontrado.' });
    }
    res.status(200).json({ message: 'Professor atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar professor:', error);
    // Erros do service (como email já existente)
    if (error.message.includes('Já existe um professor com esse e-mail')) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Erro interno do servidor ao atualizar professor.' });
  }
};

// Deletar Professor
const deleteProfessor = async (req, res) => {
  try {
    const deleted = await deleteProfessorService(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Professor não encontrado.' });
    }
    res.status(200).json({ message: 'Professor excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir professor:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao excluir professor.' });
  }
};

module.exports = {
  createProfessor,
  getAllProfessores,
  getProfessorById,
  updateProfessor,
  deleteProfessor
};