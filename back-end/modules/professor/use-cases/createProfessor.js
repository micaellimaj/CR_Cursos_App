const { createProfessorService, findProfessorByEmail } = require('../professorService');
const validarEmail = require('../../aluno/utils/validarEmail');
const calcularIdade = require('../../aluno/utils/calcularIdade');
const turmaService = require('../../turma/turmaService');

async function createProfessorUseCase(dados) {
  const { full_name, email, senha, telefone, data_nascimento, turma_id_principal } = dados;

  if (!full_name || !email || !senha || !data_nascimento) {
    throw new Error('Campos obrigatórios faltando: nome completo, email, senha, data de nascimento.');
  }

  if (!validarEmail(email)) {
    throw new Error('Email inválido.');
  }

  const idade = calcularIdade(data_nascimento);
  if (isNaN(idade)) {
    throw new Error('Data de nascimento inválida.');
  }
  if (idade < 18) {
    throw new Error('Professor deve ser maior de idade.');
  }


  const professorExistente = await findProfessorByEmail(email);
  if (professorExistente) {
    throw new Error('Já existe um professor com esse e-mail.');
  }

  let turmaExiste = null;
  if (turma_id_principal) {
      turmaExiste = await turmaService.getTurmaPorId(turma_id_principal);
      if (!turmaExiste) {
          throw { status: 404, message: `Turma principal com ID ${turma_id_principal} não encontrada.` };
      }
  }

  const id = await createProfessorService({
    full_name,
    email,
    senha,
    telefone: telefone || null,
    data_nascimento,
    idade,
    turma_id_principal: turma_id_principal || null
  });

  if (turmaExiste) {
      await turmaService.adicionarProfessor(turma_id_principal, id);
  }

  return { 
      id, 
      message: 'Professor criado com sucesso',
      turma_associada: turmaExiste ? turmaExiste.nome : 'Nenhuma'
  };
}

module.exports = createProfessorUseCase;
