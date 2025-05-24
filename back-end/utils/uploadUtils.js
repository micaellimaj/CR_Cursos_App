// Exemplo de função para validação futura
const tiposPermitidos = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain'
];

const validarTipoArquivo = (mimetype) => {
  return tiposPermitidos.includes(mimetype);
};

module.exports = { validarTipoArquivo };
