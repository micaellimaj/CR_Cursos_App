const express = require("express");
const router = express.Router();

const {
  criarDisciplinaController,
  atualizarDisciplinaController,
  removerDisciplinaController,
  getDisciplinaByIdController,
  listarDisciplinasController,
  associarTurmaController,
} = require("./disciplinaController");

/**
 * @swagger
 * tags:
 *   name: Disciplinas
 *   description: Endpoints para gerenciamento de disciplinas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Disciplina:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "DIS-A1B2C3"
 *         nome:
 *           type: string
 *           example: "Matemática Básica"
 *         cursoId:
 *           type: string
 *           example: "CUR-123ABC"
 *         professorId:
 *           type: string
 *           example: "PROF-987XYZ"
 *         turmasAssociadas:
 *           type: array
 *           items:
 *             type: string
 *             example: "TUR-001"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-01-01T12:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-01-02T10:00:00.000Z"
 *
 *     CreateDisciplinaRequest:
 *       type: object
 *       required:
 *         - nome
 *         - cursoId
 *         - professorId
 *       properties:
 *         nome:
 *           type: string
 *         cursoId:
 *           type: string
 *         professorId:
 *           type: string
 *
 *     AssociarTurmaRequest:
 *       type: object
 *       required:
 *         - disciplinaId
 *         - turmaId
 *         - professorId
 *       properties:
 *         disciplinaId:
 *           type: string
 *         turmaId:
 *           type: string
 *         professorId:
 *           type: string
 */

/**
 * @swagger
 * /disciplinas:
 *   post:
 *     summary: Criar uma disciplina
 *     tags: [Disciplinas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDisciplinaRequest'
 *     responses:
 *       201:
 *         description: Disciplina criada com sucesso.
 *       400:
 *         description: Erro de validação.
 *       500:
 *         description: Erro interno no servidor.
 */
router.post("/", criarDisciplinaController);

/**
 * @swagger
 * /disciplinas:
 *   get:
 *     summary: Listar todas as disciplinas
 *     tags: [Disciplinas]
 *     responses:
 *       200:
 *         description: Lista de disciplinas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Disciplina'
 *       500:
 *         description: Erro interno no servidor.
 */
router.get("/", listarDisciplinasController);

/**
 * @swagger
 * /disciplinas/associar-turma:
 *   post:
 *     summary: Associar uma turma à disciplina
 *     tags: [Disciplinas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssociarTurmaRequest'
 *     responses:
 *       200:
 *         description: Turma associada com sucesso.
 *       400:
 *         description: Erro de validação ou professor não autorizado.
 *       500:
 *         description: Erro interno no servidor.
 */
router.post("/associar-turma", associarTurmaController);

/**
 * @swagger
 * /disciplinas/{id}:
 *   get:
 *     summary: Buscar disciplina por ID
 *     tags: [Disciplinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da disciplina
 *     responses:
 *       200:
 *         description: Disciplina encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Disciplina'
 *       404:
 *         description: Disciplina não encontrada.
 *       500:
 *         description: Erro interno no servidor.
 */
router.get("/:id", getDisciplinaByIdController);

/**
 * @swagger
 * /disciplinas/{id}:
 *   put:
 *     summary: Atualizar uma disciplina
 *     tags: [Disciplinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da disciplina
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Campos que podem ser atualizados
 *             example:
 *               nome: "Matemática II"
 *               cursoId: "CUR-111AAA"
 *               professorId: "PROF-555CCC"
 *     responses:
 *       200:
 *         description: Disciplina atualizada.
 *       400:
 *         description: Erro de validação.
 *       500:
 *         description: Erro interno no servidor.
 */
router.put("/:id", atualizarDisciplinaController);

/**
 * @swagger
 * /disciplinas/{id}:
 *   delete:
 *     summary: Remover uma disciplina
 *     tags: [Disciplinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da disciplina
 *     responses:
 *       200:
 *         description: Disciplina removida.
 *       404:
 *         description: Disciplina não encontrada.
 *       500:
 *         description: Erro interno no servidor.
 */
router.delete("/:id", removerDisciplinaController);

module.exports = router;
