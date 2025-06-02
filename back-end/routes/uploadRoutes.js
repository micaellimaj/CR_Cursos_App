const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadController = require('../controllers/uploadController');
const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.memoryStorage(); // Para permitir manipulação dos arquivos via buffer
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain'
    ];
    if (allowedTypes.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Tipo de arquivo não suportado'), false);
  }
});

// CREATE
router.post('/', upload.single('arquivo'), uploadController.uploadFile);

// READ
router.get('/', uploadController.listFiles);
router.get('/:fileName', uploadController.getFile);

// UPDATE
router.put('/:fileName', upload.single('arquivo'), uploadController.updateFile);

// DELETE
router.delete('/:fileName', uploadController.deleteFile);

module.exports = router;
