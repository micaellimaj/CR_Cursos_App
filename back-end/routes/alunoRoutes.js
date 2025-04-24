const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');
const axios = require('axios');

router.post('/alunos', alunoController.createAluno);
router.get('/alunos', alunoController.getAllAlunos);
router.get('/alunos/:id', alunoController.getAlunoById);
router.put('/alunos/:id', alunoController.updateAluno);
router.delete('/alunos/:id', alunoController.deleteAluno);

router.get('/alunos/external/:id', async (req, res) => {
  const { id } = req.params;
  const { token } = req.headers;

  try {
    const response = await axios.get(`http://192.168.25.20:5000/api/alunos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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