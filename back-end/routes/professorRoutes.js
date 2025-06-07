const express = require('express');
const router = express.Router();
const {
  createProfessor,
  getAllProfessores,
  getProfessorById,
  updateProfessor,
  deleteProfessor
} = require('../controllers/professorController');

const authMiddleware = require('../middlewares/authMiddleware');
const verificarAdmin = require('../middlewares/verificarAdmin');
const verificarProprioUsuario = require('../middlewares/verificarProprioUsuario');

router.post('/', authMiddleware, verificarAdmin, createProfessor);
router.get('/', verificarAdmin, getAllProfessores);
router.get('/:id', authMiddleware, verificarProprioUsuario('professor'), getProfessorById);
router.put('/:id', authMiddleware, verificarProprioUsuario('professor'), updateProfessor);
router.delete('/:id', authMiddleware, verificarProprioUsuario('professor'), deleteProfessor);


module.exports = router;
