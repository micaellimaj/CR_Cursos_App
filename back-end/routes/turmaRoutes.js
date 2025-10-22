const express = require('express');
const router = express.Router();
const { createTurma, matricularAluno, associarProfessor,getAlunosDaTurma,getAllTurmas, getTurmaById, updateTurma, deleteTurma, } = require('../controllers/turmaController');

const authMiddleware = require('../middlewares/authMiddleware');
const verificarAdmin = require('../middlewares/verificarAdmin');

router.post('/', authMiddleware, verificarAdmin, createTurma);
router.post('/:turmaId/aluno', authMiddleware, verificarAdmin, matricularAluno);
router.post('/:turmaId/professor', authMiddleware, verificarAdmin, associarProfessor);
router.get('/:turmaId/alunos', authMiddleware, getAlunosDaTurma);
router.get('/', authMiddleware, getAllTurmas); 
router.get('/:id', authMiddleware, getTurmaById);
router.put('/:id', authMiddleware, verificarAdmin, updateTurma);
router.delete('/:id', authMiddleware, verificarAdmin, deleteTurma);

module.exports = router;