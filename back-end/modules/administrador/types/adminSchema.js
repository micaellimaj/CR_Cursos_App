const validarEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

const validarDadosAdmin = (dados, isUpdate = false) => {
  const { full_name, email, senha } = dados;

  if (!isUpdate && (!full_name || !email || !senha)) {
    throw { status: 400, message: 'Campos obrigatórios faltando (nome, email ou senha)' };
  }

  if (email && !validarEmail(email)) {
    throw { status: 400, message: 'Email inválido' };
  }

  if (senha && senha.length < 6) {
    throw { status: 400, message: 'A senha deve ter pelo menos 6 caracteres' };
  }
};

module.exports = { validarDadosAdmin };