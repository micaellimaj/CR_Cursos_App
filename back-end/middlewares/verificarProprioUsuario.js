module.exports = function (tipoPermitido) {
  return (req, res, next) => {
    const { id: userId, tipo } = req.user;
    const idRequisicao = req.params.id;


    if (tipo === 'admin') {
      return next();
    }

    if (tipo === tipoPermitido && userId === idRequisicao) {
      return next();
    }

    return res.status(403).send('Acesso negado. Você só pode acessar os seus próprios dados.');
  };
};
