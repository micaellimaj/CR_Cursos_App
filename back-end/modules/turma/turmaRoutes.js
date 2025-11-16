const express = require('express');
const router = express.Router();
const { 
    createTurma, 
    matricularAluno, 
    associarProfessor,
    getAlunosDaTurma,
    getAllTurmas, 
    getTurmaById, 
    updateTurma, 
    deleteTurma, 
} = require('../controllers/turmaController');

const authMiddleware = require('../middlewares/authMiddleware');
const verificarAdmin = require('../middlewares/verificarAdmin');

/**
 * @swagger
 * tags:
 *   - name: Turmas
 *     description: Gerenciamento das Turmas, incluindo associação de alunos e professores.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TurmaInput:
 *       type: object
 *       required:
 *         - nome
 *         - curso_id
 *         - data_inicio
 *         - data_fim
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome da turma.
 *           example: Turma A - Manhã
 *         curso_id:
 *           type: string
 *           description: ID do curso ao qual esta turma pertence.
 *           example: 60c72b4f9f1b2c001c8e4d1a
 *         data_inicio:
 *           type: string
 *           format: date
 *           description: Data de início da turma (deve ser anterior à data de fim).
 *           example: 2025-03-01
 *         data_fim:
 *           type: string
 *           format: date
 *           description: Data de fim da turma.
 *           example: 2025-12-15
 *         professor_principal_id:
 *           type: string
 *           description: ID opcional do professor principal responsável pela turma.
 *           example: 60c72b4f9f1b2c001c8e4d4d
 *     Turma:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único da turma.
 *           example: 60c72b4f9f1b2c001c8e4d2b
 *         nome:
 *           type: string
 *           description: Nome da turma.
 *         curso_id:
 *           type: string
 *           description: ID do curso.
 *         data_inicio:
 *           type: string
 *           format: date
 *           description: Data de início da turma.
 *         data_fim:
 *           type: string
 *           format: date
 *           description: Data de fim da turma.
 *         professor_principal_id:
 *           type: string
 *           description: ID do professor principal.
 *         createdAt:
 *           type: string
 *           format: date-time
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensagem de erro retornada pelo servidor.
 *           example: A data de início deve ser anterior à data de fim da turma.
 *     Aluno:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         nome:
 *           type: string
 *         email:
 *           type: string
 */

/**
 * @swagger
 * /turmas:
 *   post:
 *     summary: Cria uma nova turma. (Admin Required)
 *     description: Requer 'curso_id', 'nome', 'data_inicio' e 'data_fim'. Valida que a data de início é anterior à data de fim.
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TurmaInput'
 *     responses:
 *       '201':
 *         description: Turma criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Turma criada com sucesso!
 *                 turma:
 *                   $ref: '#/components/schemas/Turma'
 *       '400':
 *         description: Erro de validação (Campos obrigatórios ausentes ou datas inválidas).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '401':
 *         description: Não autorizado.
 *       '403':
 *         description: Proibido (Usuário não é Admin).
 *       '404':
 *         description: Curso com o ID fornecido não encontrado.
 *       '500':
 *         description: Erro interno do servidor.
 */
router.post('/', authMiddleware, verificarAdmin, createTurma);

/**
 * @swagger
 * /turmas/{turmaId}/aluno:
 *   post:
 *     summary: Matricula um aluno em uma turma. (Admin Required)
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: turmaId
 *         required: true
 *         schema:
 *           type: string
 *           description: ID da turma para matricular o aluno.
 *           example: 60c72b4f9f1b2c001c8e4d2b
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alunoId:
 *                 type: string
 *                 description: ID do aluno a ser matriculado.
 *                 example: 60c72b4f9f1b2c001c8e4d3c
 *     responses:
 *       '200':
 *         description: Aluno matriculado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Aluno matriculado com sucesso.
 *       '401':
 *         description: Não autorizado.
 *       '403':
 *         description: Proibido (Usuário não é Admin).
 *       '500':
 *         description: Erro interno do servidor.
 */
router.post('/:turmaId/aluno', authMiddleware, verificarAdmin, matricularAluno);

/**
 * @swagger
 * /turmas/{turmaId}/professor:
 *   post:
 *     summary: Associa um professor a uma turma. (Admin Required)
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: turmaId
 *         required: true
 *         schema:
 *           type: string
 *           description: ID da turma para associar o professor.
 *           example: 60c72b4f9f1b2c001c8e4d2b
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               professorId:
 *                 type: string
 *                 description: ID do professor a ser associado.
 *                 example: 60c72b4f9f1b2c001c8e4d4d
 *     responses:
 *       '200':
 *         description: Professor associado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Professor associado com sucesso.
 *       '401':
 *         description: Não autorizado.
 *       '403':
 *         description: Proibido (Usuário não é Admin).
 *       '500':
 *         description: Erro interno do servidor.
 */
router.post('/:turmaId/professor', authMiddleware, verificarAdmin, associarProfessor);

/**
 * @swagger
 * /turmas/{turmaId}/alunos:
 *   get:
 *     summary: Lista os alunos matriculados em uma turma.
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: turmaId
 *         required: true
 *         schema:
 *           type: string
 *           description: ID da turma.
 *           example: 60c72b4f9f1b2c001c8e4d2b
 *     responses:
 *       '200':
 *         description: Lista de alunos recuperada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aluno'
 *       '401':
 *         description: Não autorizado.
 *       '404':
 *         description: Turma não encontrada.
 *       '500':
 *         description: Erro interno do servidor.
 */
router.get('/:turmaId/alunos', authMiddleware, getAlunosDaTurma);

/**
 * @swagger
 * /turmas:
 *   get:
 *     summary: Lista todas as turmas.
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de turmas recuperada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Turma'
 *       '401':
 *         description: Não autorizado.
 *       '500':
 *         description: Erro interno do servidor.
 */
router.get('/', authMiddleware, getAllTurmas);

/**
 * @swagger
 * /turmas/{id}:
 *   get:
 *     summary: Obtém uma turma pelo ID.
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID único da turma.
 *           example: 60c72b4f9f1b2c001c8e4d2b
 *     responses:
 *       '200':
 *         description: Turma encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turma'
 *       '401':
 *         description: Não autorizado.
 *       '404':
 *         description: Turma não encontrada.
 *       '500':
 *         description: Erro interno do servidor.
 */
router.get('/:id', authMiddleware, getTurmaById);

/**
 * @swagger
 * /turmas/{id}:
 *   put:
 *     summary: Atualiza uma turma existente. (Admin Required)
 *     description: Atualiza um ou mais campos da turma. Valida a consistência das datas se forem fornecidas.
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID da turma a ser atualizada.
 *           example: 60c72b4f9f1b2c001c8e4d2b
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Novo nome da turma (Opcional).
 *               curso_id:
 *                 type: string
 *                 description: Novo ID do curso (Opcional).
 *               data_inicio:
 *                 type: string
 *                 format: date
 *                 description: Nova data de início (Opcional).
 *               data_fim:
 *                 type: string
 *                 format: date
 *                 description: Nova data de fim (Opcional).
 *               professor_principal_id:
 *                 type: string
 *                 description: Novo ID do professor principal (Opcional).
 *     responses:
 *       '200':
 *         description: Turma atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Turma atualizada com sucesso.
 *       '400':
 *         description: Erro de validação (Datas inconsistentes).
 *       '401':
 *         description: Não autorizado.
 *       '403':
 *         description: Proibido (Usuário não é Admin).
 *       '404':
 *         description: Turma ou Curso não encontrado.
 *       '500':
 *         description: Erro interno do servidor.
 */
router.put('/:id', authMiddleware, verificarAdmin, updateTurma);

/**
 * @swagger
 * /turmas/{id}:
 *   delete:
 *     summary: Deleta uma turma pelo ID. (Admin Required)
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID da turma a ser deletada.
 *           example: 60c72b4f9f1b2c001c8e4d2b
 *     responses:
 *       '200':
 *         description: Turma deletada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Turma deletada com sucesso.
 *       '401':
 *         description: Não autorizado.
 *       '403':
 *         description: Proibido (Usuário não é Admin).
 *       '404':
 *         description: Turma não encontrada.
 *       '500':
 *         description: Erro interno do servidor.
 */
router.delete('/:id', authMiddleware, verificarAdmin, deleteTurma);

module.exports = router;