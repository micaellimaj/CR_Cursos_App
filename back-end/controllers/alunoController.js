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

// Função auxiliar para calcular idade
const calcularIdade = (dataNascimento) => {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();

  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
};

// Criar novo Aluno
const createAluno = async (req, res) => {
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

  if (!full_name || !email || !senha || !confirmarSenha || !data_nascimento) {
    return res.status(400).send('Campos obrigatórios faltando');
  }

  if (senha !== confirmarSenha) {
    return res.status(400).send('As senhas não coincidem');
  }

  const idade = calcularIdade(data_nascimento);

  if (idade < 18) {
    if (!nome_responsavel || !email_responsavel || !telefone_responsavel) {
      return res.status(400).send('Responsável obrigatório para menores de idade');
    }
  }

  try {
    const hashedSenha = await bcrypt.hash(senha, 10);
    const customId = gerarIdPersonalizado();

    await db.ref(`alunos/${customId}`).set({
      full_name,
      email,
      senha: hashedSenha,
      data_nascimento,
      idade,
      nome_responsavel: idade < 18 ? nome_responsavel : null,
      email_responsavel: idade < 18 ? email_responsavel : null,
      telefone_responsavel: idade < 18 ? telefone_responsavel : null,
      telefone: telefone || null,
      created_at: new Date().toISOString()
    });

    res.status(201).send({ id: customId, message: 'Aluno criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar aluno:', error);
    res.status(500).send('Erro interno');
  }
};

// Retornar todos os Alunos (sem senha)
const getAllAlunos = async (req, res) => {
  try {
    const snapshot = await db.ref('alunos').once('value');
    const data = snapshot.val();

    if (!data) return res.status(200).send([]);

    const alunos = Object.keys(data).map(id => {
      const aluno = data[id];
      delete aluno.senha;
      return { id, ...aluno };
    });

    res.status(200).send(alunos);
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    res.status(500).send('Erro interno');
  }
};

// Retornar Aluno por ID (sem senha)
const getAlunoById = async (req, res) => {
  const { id } = req.params;

  try {
    const snapshot = await db.ref(`alunos/${id}`).once('value');
    const aluno = snapshot.val();

    if (!aluno) {
      return res.status(404).send('Aluno não encontrado');
    }

    delete aluno.senha;
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
    // Verifica idade se data_nascimento for fornecida
    if (dados.data_nascimento) {
      const nascimento = new Date(dados.data_nascimento);
      const hoje = new Date();
      const idade = hoje.getFullYear() - nascimento.getFullYear();
      const mes = hoje.getMonth() - nascimento.getMonth();
      const dia = hoje.getDate() - nascimento.getDate();
      const menorDeIdade = idade < 18 || (idade === 18 && (mes < 0 || (mes === 0 && dia < 0)));

      // Se for menor de idade, exige os campos do responsável
      if (menorDeIdade) {
        if (
          !dados.nome_responsavel ||
          !dados.email_responsavel ||
          !dados.telefone_responsavel
        ) {
          return res.status(400).send('Campos do responsável obrigatórios para menores de idade');
        }
      } else {
        // Se for maior de idade, limpa dados do responsável
        dados.nome_responsavel = null;
        dados.email_responsavel = null;
        dados.telefone_responsavel = null;
      }
    }

    // Atualiza senha se fornecida
    if (dados.senha) {
      dados.senha = await bcrypt.hash(dados.senha, 10);
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
