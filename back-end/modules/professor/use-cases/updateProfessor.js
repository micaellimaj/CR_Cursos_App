const Professor = require('../models/professorModel');
const { updateProfessorService } = require('../professorService');
const validarEmail = require('../../aluno/utils/validarEmail');
const calcularIdade = require('../../aluno/utils/calcularIdade');

module.exports = async (id, novosDados) => {
  if (novosDados.email && !validarEmail(novosDados.email)) {
    throw { status: 400, message: 'Email inválido.' };
  }

  if (novosDados.data_nascimento) {
    const idade = calcularIdade(novosDados.data_nascimento);
    if (isNaN(idade)) throw { status: 400, message: 'Data de nascimento inválida.' };
    novosDados.idade = idade;
  }

  const professorFormatado = new Professor({ ...novosDados });
  delete professorFormatado.id;

  const updated = await updateProfessorService(id, professorFormatado.toJSON());
  if (!updated) throw { status: 404, message: 'Professor não encontrado.' };

  return { message: 'Professor atualizado com sucesso' };
};
