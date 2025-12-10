const express = require('express');
const router = express.Router();
const cursoController = require('./cursoController');
const authMiddleware = require('../../shared/middlewares/authMiddleware');
const verificarAdmin = require('../../shared/middlewares/verificarAdmin');

/**
 * @swagger
 * tags:
 *   - name: Cursos
 *     description: Gerenciamento de Cursos na plataforma.
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     CursoInput:
 *       type: object
 *       required:
 *         - nome
 *         - descricao
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome completo do curso.
 *           example: Engenharia de Software
 *         descricao:
 *           type: string
 *           description: Breve descrição do conteúdo do curso.
 *           example: Curso focado em desenvolvimento ágil e arquitetura de sistemas.
 *     Curso:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do curso.
 *           example: 60c72b4f9f1b2c001c8e4d1a
 *         nome:
 *           type: string
 *           description: Nome do curso.
 *         descricao:
 *           type: string
 *           description: Descrição do curso.
 *     Error:
 *       type: object
 *       properties:
 *         erro:
 *           type: string
 *           description: Mensagem de erro retornada pelo servidor.
 *           example: Curso não encontrado.
 */

/**
 * @swagger
 * /cursos:
 *   post:
 *     summary: Cadastra um novo curso. (Admin Required)
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CursoInput'
 *     responses:
 *       '201':
 *         description: Curso cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Curso cadastrado com sucesso!
 *                 curso:
 *                   $ref: '#/components/schemas/Curso'
 *       '401':
 *         description: Não autorizado (Token inválido ou ausente).
 *       '403':
 *         description: Proibido (Usuário não é Admin).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', authMiddleware, verificarAdmin, cursoController.cadastrarCurso);

/**
 * @swagger
 * /cursos:
 *   get:
 *     summary: Lista todos os cursos.
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de cursos recuperada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 *       '401':
 *         description: Não autorizado (Token inválido ou ausente).
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', authMiddleware, cursoController.listarCursos);

/**
 * @swagger
 * /cursos/{id}:
 *   get:
 *     summary: Obtém um curso pelo ID.
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID único do curso.
 *           example: 60c72b4f9f1b2c001c8e4d1a
 *     responses:
 *       '200':
 *         description: Curso encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       '401':
 *         description: Não autorizado.
 *       '404':
 *         description: Curso não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Erro interno do servidor.
 */
router.get('/:id', authMiddleware, cursoController.getCursoById);

/**
 * @swagger
 * /cursos/{id}:
 *   put:
 *     summary: Atualiza um curso existente. (Admin Required)
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID do curso a ser atualizado.
 *           example: 60c72b4f9f1b2c001c8e4d1a
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CursoInput'
 *     responses:
 *       '200':
 *         description: Curso atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Curso atualizado com sucesso.
 *                 curso:
 *                   $ref: '#/components/schemas/Curso'
 *       '401':
 *         description: Não autorizado.
 *       '403':
 *         description: Proibido (Usuário não é Admin).
 *       '404':
 *         description: Curso não encontrado.
 *       '500':
 *         description: Erro interno do servidor.
 */
router.put('/:id', authMiddleware, verificarAdmin, cursoController.updateCurso);

/**
 * @swagger
 * /cursos/{id}:
 *   delete:
 *     summary: Deleta um curso pelo ID. (Admin Required)
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID do curso a ser deletado.
 *           example: 60c72b4f9f1b2c001c8e4d1a
 *     responses:
 *       '200':
 *         description: Curso deletado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Curso deletado com sucesso.
 *       '401':
 *         description: Não autorizado.
 *       '403':
 *         description: Proibido (Usuário não é Admin).
 *       '404':
 *         description: Curso não encontrado.
 *       '500':
 *         description: Erro interno do servidor.
 */
router.delete('/:id', authMiddleware, verificarAdmin, cursoController.deleteCurso);

/**
 * @swagger
 * /cursos/{id}/turmas:
 *   get:
 *     summary: Lista as turmas associadas a um curso.
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID do curso para listar as turmas.
 *           example: 60c72b4f9f1b2c001c8e4d1a
 *     responses:
 *       '200':
 *         description: Lista de turmas recuperada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 60c72b4f9f1b2c001c8e4d1b
 *                   nome:
 *                     type: string
 *                     example: Turma 2024.1
 *       '401':
 *         description: Não autorizado.
 *       '404':
 *         description: Curso não encontrado.
 *       '500':
 *         description: Erro interno do servidor.
 */
router.get('/:id/turmas', authMiddleware, cursoController.getTurmasDoCurso);

module.exports = router;