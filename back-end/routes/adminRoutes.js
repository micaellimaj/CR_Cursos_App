const express = require('express');
const router = express.Router();

const { loginAdmin } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const verificarAdmin = require('../middlewares/verificarAdmin');

router.post('/login', loginAdmin);
router.get('/painel', authMiddleware, verificarAdmin, (req, res) => {
  res.status(200).send(`Bem-vindo, administrador: ${req.user.email}`);
});

module.exports = router;
