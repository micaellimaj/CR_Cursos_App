const calcularIdade = require('../../utils/aluno/calcularIdade');
const validarEmail = require('../../utils/aluno/validarEmail');
const { atualizarAluno } = require('../../services/alunoService');

module.exports = async (id, novosDados) => {
  if (novosDados.email && !validarEmail(novosDados.email)) {
    throw { status: 400, message: 'Email inválido' };
  }

  if (novosDados.data_nascimento) {
    const idade = calcularIdade(novosDados.data_nascimento);

    if (isNaN(idade)) {
      throw { status: 400, message: 'Data de nascimento inválida. Use o formato DD/MM/AAAA.' };
    }

    if (idade < 18 && (!novosDados.nome_responsavel || !novosDados.email_responsavel || !novosDados.telefone_responsavel)) {
      throw { status: 400, message: 'Dados do responsável são obrigatórios para menores de idade' };
    }

    novosDados.idade = idade;
    novosDados.nome_responsavel = idade < 18 ? novosDados.nome_responsavel : null;
    novosDados.email_responsavel = idade < 18 ? novosDados.email_responsavel : null;
    novosDados.telefone_responsavel = idade < 18 ? novosDados.telefone_responsavel : null;
  }

  const sucesso = await atualizarAluno(id, novosDados);
  if (!sucesso) {
    throw { status: 404, message: 'Aluno não encontrado' };
  }

  return { message: 'Aluno atualizado com sucesso' };
};
