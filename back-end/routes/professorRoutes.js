const express = require('express');
const router = express.Router();

const {
  createProfessor,
  getAllProfessores,
  getProfessorById,
  updateProfessor,
  deleteProfessor
} = require('../controllers/professorController');

const authMiddleware = require('../middlewares/authMiddleware');
const verificarAdmin = require('../middlewares/verificarAdmin');
const verificarProprioUsuario = require('../middlewares/verificarProprioUsuario');

/**
 * @swagger
 * tags:
 *   name: Professor
 *   description: Endpoints para gerenciamento de professores
 */

/**
 * @swagger
 * /professor:
 *   post:
 *     summary: Cria um novo professor.
 *     tags: [Professor]
 *     description: Endpoint para criar um novo registro de professor. Requer permissões de administrador.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - email
 *               - senha
 *               - data_nascimento
 *             properties:
 *               full_name:
 *                 type: string
 *                 description: Nome completo do professor.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email único do professor.
 *               senha:
 *                 type: string
 *                 description: Senha do professor.
 *               telefone:
 *                 type: string
 *                 description: Telefone do professor.
 *               data_nascimento:
 *                 type: string
 *                 description: Data de nascimento do professor no formato DD/MM/AAAA.
 *     responses:
 *       201:
 *         description: Professor criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Requisição inválida.
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Proibido.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/', authMiddleware, verificarAdmin, createProfessor);

/**
 * @swagger
 * /professor:
 *   get:
 *     summary: Retorna a lista de todos os professores.
 *     tags: [Professor]
 *     description: Requer permissões de administrador.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de professores obtida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   full_name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   telefone:
 *                     type: string
 *                   data_nascimento:
 *                     type: string
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Proibido.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/', authMiddleware, verificarAdmin, getAllProfessores);

/**
 * @swagger
 * /professor/{id}:
 *   get:
 *     summary: Retorna um professor pelo ID.
 *     tags: [Professor]
 *     description: O usuário deve ser o próprio professor ou um administrador.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do professor.
 *     responses:
 *       200:
 *         description: Professor encontrado com sucesso.
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Proibido.
 *       404:
 *         description: Professor não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/:id', authMiddleware, verificarProprioUsuario('professor'), getProfessorById);

/**
 * @swagger
 * /professor/{id}:
 *   put:
 *     summary: Atualiza um professor pelo ID.
 *     tags: [Professor]
 *     description: O usuário deve ser o próprio professor ou um administrador.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do professor a ser atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *     responses:
 *       200:
 *         description: Professor atualizado com sucesso.
 *       400:
 *         description: Requisição inválida.
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Proibido.
 *       404:
 *         description: Professor não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.put('/:id', authMiddleware, verificarProprioUsuario('professor'), updateProfessor);

/**
 * @swagger
 * /professor/{id}:
 *   delete:
 *     summary: Deleta um professor pelo ID.
 *     tags: [Professor]
 *     description: Apenas administradores podem excluir professores.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do professor a ser deletado.
 *     responses:
 *       200:
 *         description: Professor removido com sucesso.
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Proibido.
 *       404:
 *         description: Professor não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.delete('/:id', authMiddleware, verificarAdmin, deleteProfessor);

module.exports = router;
