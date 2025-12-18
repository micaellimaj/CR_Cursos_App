const bcrypt = require('bcryptjs');
const Aluno = require('../models/alunoModel');
const { validarDadosAluno } = require('../types/alunoSchema');
const calcularIdade = require('../utils/calcularIdade');
const gerarIdPersonalizado = require('../utils/gerarIdPersonalizado');
const { emailExiste, criarAluno } = require('../alunoService');
const turmaService = require('../../turma/turmaService');

module.exports = async (dados) => {
  validarDadosAluno(dados);

  const idade = calcularIdade(dados.data_nascimento);
  if (isNaN(idade)) throw { status: 400, message: 'Data de nascimento inválida.' };

  if (idade < 18 && (!dados.nome_responsavel || !dados.email_responsavel)) {
    throw { status: 400, message: 'Responsável obrigatório para menores' };
  }

  if (await emailExiste(dados.email)) {
    throw { status: 400, message: 'E-mail já cadastrado' };
  }

  const turmaExiste = await turmaService.getTurmaPorId(dados.turma_id);
  if (!turmaExiste) throw { status: 404, message: 'Turma não encontrada' };

  const hashedSenha = await bcrypt.hash(dados.senha, 10);
  const customId = gerarIdPersonalizado();

  const novoAluno = new Aluno({
    ...dados,
    id: customId,
    senha: hashedSenha,
    idade
  });

  await criarAluno(novoAluno.id, novoAluno);
  await turmaService.adicionarAluno(novoAluno.turma_id, novoAluno.id);

  return { 
    id: novoAluno.id, 
    message: 'Aluno criado com sucesso', 
    curso: turmaExiste.nome 
  };
};