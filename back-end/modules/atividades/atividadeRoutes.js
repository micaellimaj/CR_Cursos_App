const express = require("express");
const router = express.Router();
const upload = require("../../shared/middlewares/uploadMiddleware");

const {
  criarAtividadeController,
  atualizarAtividadeController,
  removerAtividadeController,
  getAtividadeByIdController,
  listarAtividadesPorDisciplinaController,
} = require("./atividadeController");

/**
 * @swagger
 * tags:
 *   name: Atividades
 *   description: Gerenciamento de atividades das disciplinas (Texto, PDF, Slides)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Atividade:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "ATIV-K9L2M5"
 *         disciplinaId:
 *           type: string
 *           example: "DIS-A1B2C3"
 *         titulo:
 *           type: string
 *           example: "Atividade 01 - Questionário de Revisão"
 *         descricao:
 *           type: string
 *           example: "Responda as questões com base no capítulo 2."
 *         tipo:
 *           type: string
 *           enum: [texto, pdf, slide]
 *           example: "pdf"
 *         conteudoTexto:
 *           type: string
 *           description: "Corpo da atividade em texto (obrigatório se tipo for 'texto')"
 *         urlArquivo:
 *           type: string
 *           description: "Link gerado pelo Firebase Storage para PDF ou Slides"
 *         dataEntrega:
 *           type: string
 *           format: date-time
 *           example: "2025-12-31T23:59:59Z"
 */

/**
 * @swagger
 * /atividades:
 *   post:
 *     summary: Criar uma nova atividade (Texto, PDF ou Slide)
 *     description: |
 *       Dependendo do **tipo**, você deve preencher campos diferentes:
 *       - **tipo 'texto'**: Preencha o campo `conteudoTexto`.
 *       - **tipo 'pdf' ou 'slide'**: Utilize o campo `arquivo` para upload.
 *     tags: [Atividades]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - disciplinaId
 *               - titulo
 *               - tipo
 *             properties:
 *               disciplinaId:
 *                 type: string
 *               titulo:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [texto, pdf, slide]
 *               descricao:
 *                 type: string
 *               conteudoTexto:
 *                 type: string
 *               dataEntrega:
 *                 type: string
 *                 format: date-time
 *               arquivo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Atividade criada com sucesso.
 *       400:
 *         description: Erro de validação.
 */
router.post("/", upload.single("arquivo"), criarAtividadeController);

/**
 * @swagger
 * /atividades/disciplina/{disciplinaId}:
 *   get:
 *     summary: Listar todas as atividades de uma disciplina
 *     tags: [Atividades]
 *     parameters:
 *       - in: path
 *         name: disciplinaId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de atividades.
 */
router.get("/disciplina/:disciplinaId", listarAtividadesPorDisciplinaController);

/**
 * @swagger
 * /atividades/{id}:
 *   get:
 *     summary: Buscar atividade por ID
 *     tags: [Atividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados da atividade.
 *       404:
 *         description: Atividade não encontrada.
 */
router.get("/:id", getAtividadeByIdController);

/**
 * @swagger
 * /atividades/{id}:
 *   put:
 *     summary: Atualizar uma atividade
 *     tags: [Atividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Atividade'
 *     responses:
 *       200:
 *         description: Atividade atualizada.
 */
router.put("/:id", upload.single("arquivo"), atualizarAtividadeController);

/**
 * @swagger
 * /atividades/{id}:
 *   delete:
 *     summary: Remover uma atividade e seu arquivo
 *     tags: [Atividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Atividade removida.
 */
router.delete("/:id", removerAtividadeController);

module.exports = router;