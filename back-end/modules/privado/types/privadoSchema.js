const validarDadosPrivado = (dados) => {
  const { aluno_id, turma_id, mensagem, arquivos } = dados;

  if (!aluno_id || !turma_id) {
    throw {
      status: 400,
      message: 'Campos obrigatórios faltando: aluno_id e turma_id.'
    };
  }

  const temMensagem = mensagem && mensagem.trim().length > 0;
  const temArquivos = arquivos && Array.isArray(arquivos) && arquivos.length > 0;

  if (!temMensagem && !temArquivos) {
    throw {
      status: 400,
      message: 'O conteúdo privado deve conter uma mensagem de texto ou ao menos um arquivo.'
    };
  }
};

module.exports = { validarDadosPrivado };