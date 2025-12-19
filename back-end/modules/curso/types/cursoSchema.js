const validarDadosCurso = (dados) => {
  if (!dados.nome) {
    throw { status: 400, message: 'O nome do curso é obrigatório.' };
  }
};

module.exports = { validarDadosCurso };