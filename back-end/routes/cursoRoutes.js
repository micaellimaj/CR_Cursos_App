
const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const authMiddleware = require('../middlewares/authMiddleware'); 


router.post('/', 
    cursoController.cadastrarCurso
);

router.get('/', cursoController.listarCursos);

module.exports = router;