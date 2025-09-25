const bcrypt = require('bcryptjs');
const calcularIdade = require('../../utils/aluno/calcularIdade');
const validarEmail = require('../../utils/aluno/validarEmail');
const gerarIdPersonalizado = require('../../utils/aluno/gerarIdPersonalizado');
const { emailExiste, criarAluno } = require('../../services/alunoService');

module.exports = async (dados) => {
  const {
    full_name,
    email,
    senha,
    nome_responsavel,
    email_responsavel,
    telefone_responsavel,
    telefone,
    data_nascimento
  } = dados;

  if (!full_name || !email || !senha || !data_nascimento) {
    throw { status: 400, message: 'Campos obrigatórios faltando' };
  }

  if (!validarEmail(email)) {
    throw { status: 400, message: 'Email inválido' };
  }

  const idade = calcularIdade(data_nascimento);
  if (isNaN(idade)) {
    throw { status: 400, message: 'Data de nascimento inválida. Use o formato DD/MM/AAAA.' };
  }

  if (idade < 18 && (!nome_responsavel || !email_responsavel || !telefone_responsavel)) {
    throw { status: 400, message: 'Responsável obrigatório para menores de idade' };
  }

  if (await emailExiste(email)) {
    throw { status: 400, message: 'Já existe um aluno com esse e-mail' };
  }

  const hashedSenha = await bcrypt.hash(senha, 10);
  const customId = gerarIdPersonalizado();

  const alunoData = {
    full_name,
    email,
    senha: hashedSenha,
    data_nascimento,
    idade,
    nome_responsavel: idade < 18 ? nome_responsavel : null,
    email_responsavel: idade < 18 ? email_responsavel : null,
    telefone_responsavel: idade < 18 ? telefone_responsavel : null,
    telefone: telefone || null
  };

  const id = await criarAluno(customId, alunoData);

  return { id, message: 'Aluno criado com sucesso' };
};
