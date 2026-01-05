const express = require("express");
const router = express.Router();
const upload = require("../../shared/middlewares/uploadMiddleware");
const auth = require("../../shared/middlewares/authMiddleware");

const {
    enviarConteudo,
    getConteudoByAluno,
    updateConteudo,
    deleteConteudo
} = require("./privadoController");

/**
 * @swagger
 * tags:
 *   name: Privado
 *   description: Gerenciamento de conteúdo privado enviado de professor para aluno específico
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Privado:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "PRIV-A1B2C3"
 *         professor_id:
 *           type: string
 *           example: "PROF-456"
 *         aluno_id:
 *           type: string
 *           example: "ALUNO-789"
 *         turma_id:
 *           type: string
 *           example: "TURMA-123"
 *         mensagem:
 *           type: string
 *           example: "Aqui está o feedback do seu projeto."
 *         arquivos:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               url:
 *                 type: string
 *               tipo:
 *                 type: string
 */

/**
 * @swagger
 * /privado:
 *   post:
 *     summary: Enviar conteúdo privado para um aluno específico
 *     description: O professor só pode enviar se ele e o aluno pertencerem à mesma turma.
 *     tags: [Privado]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - aluno_id
 *               - turma_id
 *             properties:
 *               aluno_id:
 *                 type: string
 *               turma_id:
 *                 type: string
 *               mensagem:
 *                 type: string
 *               links:
 *                 type: array
 *                 items:
 *                   type: string
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Conteúdo enviado com sucesso.
 */
router.post("/", auth, upload.array("files", 5), enviarConteudo);

/**
 * @swagger
 * /privado/aluno/{alunoId}:
 *   get:
 *     summary: Listar todos os conteúdos privados recebidos por um aluno
 *     tags: [Privado]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: alunoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de conteúdos privados.
 */
router.get("/aluno/:alunoId", auth, getConteudoByAluno);

/**
 * @swagger
 * /privado/{alunoId}/{mensagemId}:
 *   put:
 *     summary: Atualizar um conteúdo privado enviado
 *     tags: [Privado]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: alunoId
 *         required: true
 *       - in: path
 *         name: mensagemId
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mensagem:
 *                 type: string
 *     responses:
 *       200:
 *         description: Conteúdo atualizado.
 */
router.put("/:alunoId/:mensagemId", auth, updateConteudo);

/**
 * @swagger
 * /privado/{alunoId}/{mensagemId}:
 *   delete:
 *     summary: Remover um conteúdo privado enviado
 *     tags: [Privado]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: alunoId
 *         required: true
 *       - in: path
 *         name: mensagemId
 *         required: true
 *     responses:
 *       200:
 *         description: Conteúdo removido.
 */
router.delete("/:alunoId/:mensagemId", auth, deleteConteudo);

module.exports = router;