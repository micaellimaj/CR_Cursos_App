const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');
const authMiddleware = require('../middlewares/authMiddleware');
const axios = require('axios');

// Cadastro pode ser aberto ou restrito, aqui está aberto
router.post('/alunos', alunoController.createAluno);

// Proteção total nas demais rotas
router.get('/alunos', authMiddleware, alunoController.getAllAlunos);
router.get('/alunos/:id', authMiddleware, alunoController.getAlunoById);
router.put('/alunos/:id', authMiddleware, alunoController.updateAluno);
router.delete('/alunos/:id', authMiddleware, alunoController.deleteAluno);

// Rota externa também protegida
router.get('/alunos/external/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`http://192.168.25.20:5000/api/alunos/${id}`, {
      headers: {
        Authorization: `Bearer ${req.headers.authorization?.split(' ')[1]}`,
      },
    });

    return res.json(response.data);
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      message: error.message,
      ...(error.response?.data && { error: error.response.data }),
    });
  }
});

module.exports = router; 
