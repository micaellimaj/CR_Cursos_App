const Aluno = require('../models/alunoModel');
const validarEmail = require('../utils/validarEmail');
const calcularIdade = require('../utils/calcularIdade');
const { atualizarAluno } = require('../alunoService');

module.exports = async (id, novosDados) => {
  if (novosDados.email && !validarEmail(novosDados.email)) {
    throw { status: 400, message: 'Email inválido' };
  }

  if (novosDados.data_nascimento) {
    const idade = calcularIdade(novosDados.data_nascimento);
    if (isNaN(idade)) throw { status: 400, message: 'Data de nascimento inválida.' };
    
    novosDados.idade = idade;

    if (idade < 18 && (!novosDados.nome_responsavel || !novosDados.email_responsavel)) {
      throw { status: 400, message: 'Responsável obrigatório para menores' };
    }
  }

  const alunoFormatado = new Aluno(novosDados);
  
  delete alunoFormatado.id;

  const sucesso = await atualizarAluno(id, alunoFormatado);
  
  if (!sucesso) throw { status: 404, message: 'Aluno não encontrado' };

  return { message: 'Aluno atualizado com sucesso' };
};