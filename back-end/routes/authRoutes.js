const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware'); 

// Rota de login
router.post('/login', login);

// Rota de logout protegida
router.post('/logout', authMiddleware, logout);

module.exports = router;
