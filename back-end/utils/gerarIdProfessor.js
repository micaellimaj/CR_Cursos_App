const gerarIdProfessor = () => {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const aleatorio = Math.floor(100000 + Math.random() * 900000);
  return `PROF${ano}${mes}${aleatorio}`;
};

module.exports = gerarIdProfessor;