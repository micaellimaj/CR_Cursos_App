// middlewares/verificarProprioUsuario.js

module.exports = function (tipoPermitido) {
  return (req, res, next) => {
    const { id: userId, tipo } = req.user;
    const idRequisicao = req.params.id;

    // Se for admin, sempre pode acessar
    if (tipo === 'admin') {
      return next();
    }

    // Se for o mesmo tipo permitido (ex: aluno ou professor) e o ID for dele mesmo
    if (tipo === tipoPermitido && userId === idRequisicao) {
      return next();
    }

    return res.status(403).send('Acesso negado. Você só pode acessar os seus próprios dados.');
  };
};
