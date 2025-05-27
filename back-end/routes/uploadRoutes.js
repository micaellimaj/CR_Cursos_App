const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Garante que a pasta 'uploads' exista
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nome do arquivo salvo
  }
});

const upload = multer({ storage });

// Rota de upload de arquivo
router.post('/', upload.single('arquivo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ erro: 'Nenhum arquivo enviado.' });
  }

  res.json({
    mensagem: 'Arquivo enviado com sucesso!',
    arquivo: req.file,
  });
});

module.exports = router;
