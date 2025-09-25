const { createProfessorService, findProfessorByEmail } = require('../../services/professorService');
const validarEmail = require('../../utils/aluno/validarEmail');
const calcularIdade = require('../../utils/aluno/calcularIdade');

async function createProfessorUseCase(dados) {
  const { full_name, email, senha, telefone, data_nascimento } = dados;

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

  // Aqui sim: verifica duplicidade
  const professorExistente = await findProfessorByEmail(email);
  if (professorExistente) {
    throw new Error('Já existe um professor com esse e-mail.');
  }

  const id = await createProfessorService({
    full_name,
    email,
    senha,
    telefone: telefone || null,
    data_nascimento,
    idade
  });

  return id;
}

module.exports = createProfessorUseCase;
