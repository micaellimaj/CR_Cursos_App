const express = require('express');
const router = express.Router();
const { createAluno } = require('../controllers/alunoController');

// GET todos os usuários (alunoController.funcao)

// GET usuário por ID (alunoController.funcao)

// POST criar novo usuário (alunoController.funcao)
router.post('/alunos', createAluno);
// PUT atualizar usuário (alunoController.funcao)

// DELETE remover usuário (alunoController.funcao)

module.exports = router;