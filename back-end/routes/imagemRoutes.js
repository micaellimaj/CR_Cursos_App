const express = require("express");
const router = express.Router();
const imagemController = require("../controllers/imagemController");
const auth = require("../middlewares/authMiddleware");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * tags:
 *   - name: Imagem
 *     description: Upload e gerenciamento de imagens
 */

/**
 * @swagger
 * /imagem/upload:
 *   post:
 *     summary: Faz upload da imagem de perfil do aluno.
 *     tags: [Imagem]
 *     description: Endpoint para um aluno fazer upload de sua imagem de perfil.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagem:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo de imagem para upload.
 *     responses:
 *       201:
 *         description: Imagem do aluno enviada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *       400:
 *         description: Nenhuma imagem enviada.
 *       401:
 *         description: Não autorizado (token não fornecido ou inválido).
 *       500:
 *         description: Erro interno do servidor.
 */
router.post(
  "/upload",
  auth,
  upload.single("imagem"),
  imagemController.uploadImagemAluno
);

module.exports = router;
