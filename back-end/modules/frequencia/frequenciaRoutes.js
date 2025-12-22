const express = require('express');
const router = express.Router();

const {
  registrarChamada,
  getFrequenciaPorAluno,
  getFrequenciaPorTurma,
  updateFrequencia,
  deleteFrequencia
} = require('./frequenciaController');

const authMiddleware = require('../../shared/middlewares/authMiddleware');
const verificarAdmin = require('../../shared/middlewares/verificarAdmin');

/**
 * @swagger
 * tags:
 *   - name: Frequencia
 *     description: Endpoints para gerenciamento de presença e faltas (Chamada)
 *
 * components:
 *   schemas:
 *     FrequenciaInput:
 *       type: object
 *       required:
 *         - turma_id
 *         - disciplina_id
 *         - professor_id
 *         - data
 *         - alunos
 *       properties:
 *         turma_id:
 *           type: string
 *           example: turma_123
 *         disciplina_id:
 *           type: string
 *           example: disc_matematica
 *         professor_id:
 *           type: string
 *           example: P0001
 *         data:
 *           type: string
 *           format: date
 *           description: Data da aula (AAAA-MM-DD)
 *           example: 20/05/2024
 *         alunos:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               aluno_id:
 *                 type: string
 *                 example: A0005
 *               status:
 *                 type: boolean
 *                 description: true para Presença, false para Falta
 *                 example: true
 *               observacao:
 *                 type: string
 *                 example: "Chegou 10min atrasado"
 *
 *     FrequenciaOutput:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         aluno_id:
 *           type: string
 *         status:
 *           type: boolean
 *         data:
 *           type: string
 *         observacao:
 *           type: string
 *
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Erro ao processar requisição.
 */

/**
 * @swagger
 * /frequencia:
 *   post:
 *     summary: Registra a chamada de uma turma (Batch)
 *     tags: [Frequencia]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FrequenciaInput'
 *     responses:
 *       201:
 *         description: Chamada registrada com sucesso.
 *       400:
 *         description: Dados inválidos ou lista de alunos vazia.
 */
router.post('/', authMiddleware, registrarChamada);

/**
 * @swagger
 * /frequencia/turma/{turmaId}:
 *   get:
 *     summary: Retorna a lista de presença de uma turma em uma data específica.
 *     tags: [Frequencia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: turmaId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de presença obtida com sucesso.
 */
router.get('/turma/:turmaId', authMiddleware, getFrequenciaPorTurma);

/**
 * @swagger
 * /frequencia/aluno/{alunoId}:
 *   get:
 *     summary: Retorna o histórico de frequências de um aluno.
 *     tags: [Frequencia]
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
 *         description: Histórico retornado com sucesso.
 */
router.get('/aluno/:alunoId', authMiddleware, getFrequenciaPorAluno);

/**
 * @swagger
 * /frequencia/{id}:
 *   put:
 *     summary: Atualiza um registro de frequência individual.
 *     tags: [Frequencia]
 *     security:
 *       - bearerAuth: []
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
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *               observacao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro atualizado.
 */
router.put('/:id', authMiddleware, updateFrequencia);

/**
 * @swagger
 * /frequencia/{id}:
 *   delete:
 *     summary: Remove um registro de frequência. (Admin Required)
 *     tags: [Frequencia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro removido.
 */
router.delete('/:id', authMiddleware, verificarAdmin, deleteFrequencia);

module.exports = router;