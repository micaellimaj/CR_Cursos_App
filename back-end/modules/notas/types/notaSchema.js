const validarDadosNota = (dados) => {
  const { alunoId, disciplinaId, professorId, turmaId, nota, valor } = dados;

  // Aceita 'nota' ou 'valor'
  const valorNota = valor !== undefined ? valor : nota;

  if (!alunoId || !disciplinaId || !professorId || !turmaId || valorNota === undefined) {
    throw { status: 400, message: 'Dados incompletos: nota, alunoId, disciplinaId, professorId e turmaId são obrigatórios.' };
  }

  if (typeof valorNota !== 'number' || valorNota < 0 || valorNota > 10) {
    throw { status: 400, message: 'A nota deve ser um número entre 0 e 10.' };
  }
};

module.exports = { validarDadosNota };