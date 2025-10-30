const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const authMiddleware = require('../middlewares/authMiddleware');
const verificarAdmin = require('../middlewares/verificarAdmin'); 

router.post('/', authMiddleware, verificarAdmin, cursoController.cadastrarCurso);
router.get('/', authMiddleware, cursoController.listarCursos);
router.get('/:id', authMiddleware, cursoController.getCursoById);
router.put('/:id', authMiddleware, verificarAdmin, cursoController.updateCurso);
router.delete('/:id', authMiddleware, verificarAdmin, cursoController.deleteCurso);
router.get('/:id/turmas', authMiddleware, cursoController.getTurmasDoCurso);


module.exports = router;