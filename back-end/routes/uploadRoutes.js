const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadController = require('../controllers/uploadController');
const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.memoryStorage();
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

/**
 * @swagger
 * tags:
 *   - name: Upload de Arquivos
 *     description: Gerenciamento de arquivos (PDF, DOCX, etc.)
 */

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Faz upload de um arquivo.
 *     tags: [Upload de Arquivos]
 *     description: Endpoint para fazer upload de um arquivo de tipos específicos (PDF, DOC, DOCX, PPT, PPTX, TXT).
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               arquivo:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo para upload.
 *     responses:
 *       200:
 *         description: Arquivo salvo com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 file:
 *                   type: object
 *                   properties:
 *                     path:
 *                       type: string
 *                     originalname:
 *                       type: string
 *       400:
 *         description: Requisição inválida ou tipo de arquivo não suportado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/', upload.single('arquivo'), uploadController.uploadFile);

/**
 * @swagger
 * /upload:
 *   get:
 *     summary: Lista todos os arquivos enviados.
 *     tags: [Upload de Arquivos]
 *     responses:
 *       200:
 *         description: Lista de arquivos obtida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 files:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/', uploadController.listFiles);

/**
 * @swagger
 * /upload/{fileName}:
 *   get:
 *     summary: Baixa um arquivo específico.
 *     tags: [Upload de Arquivos]
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: Nome do arquivo para baixar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Arquivo baixado com sucesso.
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Arquivo não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/:fileName', uploadController.getFile);

/**
 * @swagger
 * /upload/{fileName}:
 *   put:
 *     summary: Atualiza um arquivo existente.
 *     tags: [Upload de Arquivos]
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: Nome do arquivo a ser atualizado.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               arquivo:
 *                 type: string
 *                 format: binary
 *                 description: Novo arquivo para substituir o existente.
 *     responses:
 *       200:
 *         description: Arquivo atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 file:
 *                   type: object
 *       400:
 *         description: Requisição inválida ou tipo de arquivo não suportado.
 *       404:
 *         description: Arquivo não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.put('/:fileName', upload.single('arquivo'), uploadController.updateFile);

/**
 * @swagger
 * /upload/{fileName}:
 *   delete:
 *     summary: Deleta um arquivo.
 *     tags: [Upload de Arquivos]
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: Nome do arquivo a ser deletado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Arquivo removido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Arquivo não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.delete('/:fileName', uploadController.deleteFile);

module.exports = router;
