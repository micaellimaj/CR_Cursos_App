const express = require("express");
const router = express.Router();
const upload = require("../../shared/middlewares/uploadMiddleware");

const {
  createClasse,
  getClassesByTurma,
  getClasseById,
  updateClasse,
  deleteClasse
} = require("./classeController");

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Gerenciamento de postagens de aula (Materiais, Avisos, PDFs, Slides e Links)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Classe:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "CLAS-R8T2Y1"
 *         turma_id:
 *           type: string
 *           example: "TURMA-123"
 *         professor_id:
 *           type: string
 *           example: "PROF-456"
 *         titulo:
 *           type: string
 *           example: "Material de Apoio - Aula 05"
 *         descricao:
 *           type: string
 *           example: "Assista ao vídeo e leia o PDF antes da aula."
 *         tipo:
 *           type: string
 *           enum: [material, aviso, atividade]
 *           example: "material"
 *         anexos:
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
 * /classes:
 *   post:
 *     summary: Criar uma nova postagem na classe (Avisos ou Materiais)
 *     description: Permite o envio de múltiplos arquivos (files) e links externos.
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - turma_id
 *               - professor_id
 *               - titulo
 *               - tipo
 *             properties:
 *               turma_id:
 *                 type: string
 *               professor_id:
 *                 type: string
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [material, aviso, atividade]
 *               links:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de URLs externas (ex. YouTube)
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Upload de PDFs, Slides, Imagens, etc.
 *     responses:
 *       201:
 *         description: Conteúdo postado com sucesso.
 *       400:
 *         description: Erro de validação ou campos faltando.
 */
router.post("/", upload.array("files", 5), createClasse);

/**
 * @swagger
 * /classes/turma/{turma_id}:
 *   get:
 *     summary: Listar todas as postagens de uma turma
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: turma_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de conteúdos da turma.
 */
router.get("/turma/:turma_id", getClassesByTurma);

/**
 * @swagger
 * /classes/{id}:
 *   get:
 *     summary: Buscar uma postagem específica por ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do conteúdo.
 *       404:
 *         description: Conteúdo não encontrado.
 */
router.get("/:id", getClasseById);

/**
 * @swagger
 * /classes/{id}:
 *   put:
 *     summary: Atualizar uma postagem
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Classe'
 *     responses:
 *       200:
 *         description: Conteúdo atualizado.
 */
router.put("/:id", updateClasse);

/**
 * @swagger
 * /classes/{id}:
 *   delete:
 *     summary: Remover uma postagem
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Postagem removida.
 */
router.delete("/:id", deleteClasse);

module.exports = router;