const validarDadosTurma = (dados) => {
  const { curso_id, nome, data_inicio, data_fim } = dados;

  if (!curso_id || !nome || !data_inicio || !data_fim) {
    throw { 
      status: 400, 
      message: 'Campos obrigatórios faltando: curso_id, nome, data_inicio e data_fim.' 
    };
  }
};

module.exports = { validarDadosTurma };