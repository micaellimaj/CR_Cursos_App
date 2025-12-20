// notas/notaRoutes.js
const express = require("express");
const router = express.Router();

// importa o service e monta o controller como nos outros módulos
const notaController = require("./notaController");

/**
 * @swagger
 * tags:
 *   name: Notas
 *   description: Gestão de notas dos alunos
 */

/**
 * @swagger
 * /notas:
 *   post:
 *     summary: Criar uma nova nota
 *     tags: [Notas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alunoId:
 *                 type: string
 *               disciplinaId:
 *                 type: string
 *               professorId:
 *                 type: string
 *               turmaId:
 *                 type: string
 *               nota:
 *                 type: number
 *     responses:
 *       201:
 *         description: Nota criada com sucesso
 */
router.post("/", notaController.criar);

/**
 * @swagger
 * /notas/{id}:
 *   put:
 *     summary: Atualizar uma nota
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da nota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: number
 *     responses:
 *       200:
 *         description: Nota atualizada com sucesso
 */
router.put("/:id", notaController.atualizar);

/**
 * @swagger
 * /notas/{id}:
 *   delete:
 *     summary: Deletar uma nota
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da nota
 *     responses:
 *       200:
 *         description: Nota removida com sucesso
 */
router.delete("/:id", notaController.deletar);

/**
 * @swagger
 * /notas/aluno/{aluno_id}:
 *   get:
 *     summary: Listar notas por aluno
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: aluno_id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Lista de notas do aluno
 */
router.get("/aluno/:aluno_id", notaController.listarPorAluno);

/**
 * @swagger
 * /notas/disciplina/{disciplina_id}:
 *   get:
 *     summary: Listar notas por disciplina
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: disciplina_id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Lista de notas da disciplina
 */
router.get("/disciplina/:disciplina_id", notaController.listarPorDisciplina);

/**
 * @swagger
 * /notas/professor/{professor_id}:
 *   get:
 *     summary: Listar notas por professor
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: professor_id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Lista de notas atribuídas pelo professor
 */
router.get("/professor/:professor_id", notaController.listarPorProfessor);

/**
 * @swagger
 * /notas/turma/{turma_id}:
 *   get:
 *     summary: Listar notas por turma
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: turma_id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Lista de notas da turma
 */
router.get("/turma/:turma_id", notaController.listarPorTurma);

/**
 * @swagger
 * /notas/{id}:
 *   get:
 *     summary: Buscar nota por ID
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Nota encontrada
 */
router.get("/:id", notaController.buscarPorId);

module.exports = router;
