const { updateProfessorService } = require('../../services/professorService');
const validarEmail = require('../../utils/aluno/validarEmail');
const calcularIdade = require('../../utils/aluno/calcularIdade');

async function updateProfessorUseCase(id, novosDados) {
  if (novosDados.email && !validarEmail(novosDados.email)) {
    throw new Error('Email inválido.');
  }

  if (novosDados.data_nascimento) {
    const idade = calcularIdade(novosDados.data_nascimento);
    if (isNaN(idade)) {
      throw new Error('Data de nascimento inválida para atualização. Use o formato DD/MM/AAAA.');
    }
    novosDados.idade = idade;
  }

  const updated = await updateProfessorService(id, novosDados);
  if (!updated) {
    throw new Error('Professor não encontrado.');
  }

  return true;
}

module.exports = updateProfessorUseCase;
