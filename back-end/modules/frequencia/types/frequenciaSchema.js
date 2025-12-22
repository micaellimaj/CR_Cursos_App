const validarDadosFrequencia = (dados) => {
  const { aluno_id, turma_id, disciplina_id, professor_id, data, status } = dados;

  if (!aluno_id || !turma_id || !disciplina_id || !professor_id || !data) {
    throw { 
      status: 400, 
      message: 'Campos obrigatórios faltando: aluno_id, turma_id, disciplina_id, professor_id e data.' 
    };
  }

  if (typeof status !== 'boolean') {
    throw { 
      status: 400, 
      message: 'O status da frequência deve ser um valor booleano (true para presença ou false para falta).' 
    };
  }

  const regexDataBR = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regexDataBR.test(data)) {
    throw { 
      status: 400, 
      message: 'O formato da data deve ser DD/MM/AAAA.' 
    };
  }
};

module.exports = { validarDadosFrequencia };