const validarDadosAtividade = (dados) => {
  const { titulo, disciplinaId, tipo } = dados;

  if (!titulo || !disciplinaId || !tipo) {
    throw { 
      status: 400, 
      message: 'Campos obrigatórios faltando: titulo, disciplinaId e tipo (texto/pdf/slide).' 
    };
  }

  const tiposPermitidos = ['texto', 'pdf', 'slide'];
  if (!tiposPermitidos.includes(tipo)) {
    throw {
      status: 400,
      message: 'Tipo de atividade inválido. Use: texto, pdf ou slide.'
    };
  }
};

module.exports = { validarDadosAtividade };