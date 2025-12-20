const validarDadosDisciplina = (dados) => {
  const { nome, cursoId, professorId } = dados;

  if (!nome || !cursoId || !professorId) {
    throw { 
      status: 400, 
      message: 'Campos obrigatórios faltando: nome, cursoId e professorId.' 
    };
  }
};

module.exports = { validarDadosDisciplina };