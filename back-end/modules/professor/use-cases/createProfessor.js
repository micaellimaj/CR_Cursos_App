const Professor = require('../models/professorModel');
const { validarDadosProfessor } = require('../types/professorSchema');
const calcularIdade = require('../../aluno/utils/calcularIdade');
const { createProfessorService, findProfessorByEmail } = require('../professorService');
const turmaService = require('../../turma/turmaService');
const bcrypt = require('bcryptjs');
const gerarIdProfessor = require('../utils/gerarIdProfessor');

module.exports = async (dados) => {
  validarDadosProfessor(dados);

  const idade = calcularIdade(dados.data_nascimento);
  if (isNaN(idade)) throw { status: 400, message: 'Data de nascimento inválida.' };
  if (idade < 18) throw { status: 400, message: 'Professor deve ser maior de idade.' };

  if (await findProfessorByEmail(dados.email)) {
    throw { status: 400, message: 'E-mail já cadastrado.' };
  }

  let turmaExiste = null;
  if (dados.turma_id_principal) {
    turmaExiste = await turmaService.getTurmaPorId(dados.turma_id_principal);
    if (!turmaExiste) throw { status: 404, message: 'Turma principal não encontrada.' };
  }

  const hashedSenha = await bcrypt.hash(dados.senha, 10);
  const customId = gerarIdProfessor();
  
  const novoProfessor = new Professor({ 
    ...dados, 
    id: customId, 
    senha: hashedSenha, 
    idade 
  });

  const id = await createProfessorService(novoProfessor.id, novoProfessor.toJSON());

  if (turmaExiste) {
    await turmaService.adicionarProfessor(dados.turma_id_principal, id);
  }

  return { 
    id, 
    message: 'Professor criado com sucesso',
    turma_associada: turmaExiste ? turmaExiste.nome : 'Nenhuma'
  };
};