const express = require('express');
const router = express.Router();
const {
  createAluno,
  getAllAlunos,
  getAlunoById,
  updateAluno,
  deleteAluno
} = require('../controllers/alunoController');

const authMiddleware = require('../middlewares/authMiddleware');
const verificarAdmin = require('../middlewares/verificarAdmin');
const verificarProprioUsuario = require('../middlewares/verificarProprioUsuario');

router.post('/', authMiddleware, verificarAdmin, createAluno);
router.get('/',verificarAdmin, getAllAlunos);
router.get('/:id', authMiddleware, verificarProprioUsuario('aluno'), getAlunoById);
router.put('/:id', authMiddleware, verificarProprioUsuario('aluno'), updateAluno);
router.delete('/:id', authMiddleware, verificarProprioUsuario('aluno'), deleteAluno);

module.exports = router;
