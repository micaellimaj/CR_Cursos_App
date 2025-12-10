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
 *   description: Gestão de disciplinas
 */

/**
 * @swagger
 * /disciplinas:
 *   post:
 *     summary: Criar uma disciplina
 *     tags: [Disciplinas]
 */
router.post("/", criarDisciplinaController);

/**
 * @swagger
 * /disciplinas:
 *   get:
 *     summary: Listar disciplinas
 *     tags: [Disciplinas]
 */
router.get("/", listarDisciplinasController);

/**
 * @swagger
 * /disciplinas/associar-turma:
 *   post:
 *     summary: Associar uma turma à disciplina
 *     tags: [Disciplinas]
 */
router.post("/associar-turma", associarTurmaController);

/**
 * @swagger
 * /disciplinas/{id}:
 *   get:
 *     summary: Buscar disciplina por ID
 *     tags: [Disciplinas]
 */
router.get("/:id", getDisciplinaByIdController);

/**
 * @swagger
 * /disciplinas/{id}:
 *   put:
 *     summary: Atualizar disciplina
 *     tags: [Disciplinas]
 */
router.put("/:id", atualizarDisciplinaController);

/**
 * @swagger
 * /disciplinas/{id}:
 *   delete:
 *     summary: Remover disciplina
 *     tags: [Disciplinas]
 */
router.delete("/:id", removerDisciplinaController);

module.exports = router;
