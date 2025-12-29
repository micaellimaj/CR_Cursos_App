const validarDadosConteudo = (dados) => {
  const { titulo, disciplinaId, tipo } = dados;
  const tiposPermitidos = ['texto', 'arquivo', 'video', 'link'];

  if (!titulo || titulo.trim() === "") {
    throw new Error("O título do conteúdo é obrigatório.");
  }

  if (!disciplinaId) {
    throw new Error("O ID da disciplina é obrigatório para vincular o conteúdo.");
  }

  if (!tiposPermitidos.includes(tipo)) {
    throw new Error(`Tipo de conteúdo inválido. Use: ${tiposPermitidos.join(', ')}`);
  }

  if (tipo === 'texto' && !dados.valor) {
    throw new Error("Para conteúdos do tipo 'texto', o campo 'valor' é obrigatório.");
  }

  if ((tipo === 'link' || tipo === 'video') && !dados.url) {
    throw new Error(`Para conteúdos do tipo '${tipo}', a 'url' é obrigatória.`);
  }

  if (tipo === 'arquivo' && !dados.url && !dados.buffer) {
    throw new Error("Para conteúdos do tipo 'arquivo', o arquivo ou a URL deve ser fornecido.");
  }

  return true;
};

module.exports = { validarDadosConteudo };