const validarDadosClasse = (dados) => {
  const { turma_id, professor_id, titulo, tipo } = dados;

  if (!turma_id || !professor_id || !titulo || !tipo) {
    throw { 
      status: 400, 
      message: 'Campos obrigatórios faltando: turma_id, professor_id, titulo e tipo.' 
    };
  }
};

module.exports = { validarDadosClasse };