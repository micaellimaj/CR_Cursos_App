const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

router.post('/alunos', alunoController.createAluno);
router.get('/alunos', alunoController.getAllAlunos);
router.get('/alunos/:id', alunoController.getAlunoById);
router.put('/alunos/:id', alunoController.updateAluno);
router.delete('/alunos/:id', alunoController.deleteAluno);

module.exports = router;