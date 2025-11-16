module.exports = (req, res, next) => {
  if (!req.user || req.user.tipo !== 'admin') {
    return res.status(403).send('Acesso negado: apenas administradores');
  }
  next();
};
