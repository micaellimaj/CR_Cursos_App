const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');
const authMiddleware = require('../middlewares/authMiddleware');

// Cadastro de professor aberto (sem autenticação)
router.post('/professores', professorController.createProfessor);

// Proteção com autenticação nas demais rotas
router.get('/professores', authMiddleware, professorController.getAllProfessores);
router.get('/professores/:id', authMiddleware, professorController.getProfessorById);
router.put('/professores/:id', authMiddleware, professorController.updateProfessor);
router.delete('/professores/:id', authMiddleware, professorController.deleteProfessor);

module.exports = router;

