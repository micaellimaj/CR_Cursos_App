const express = require('express');
const router = express.Router();

const {
    createProfessor,
    getAllProfessores,
    getProfessorById,
    updateProfessor,
    deleteProfessor
} = require('./professorController');

const authMiddleware = require('../../shared/middlewares/authMiddleware');
const verificarAdmin = require('../../shared/middlewares/verificarAdmin');
const verificarProprioUsuario = require('../../shared/middlewares/verificarProprioUsuario');

/**
 * @swagger
 * tags:
 *   - name: Professor
 *     description: Endpoints para gerenciamento de professores
 *
 * components:
 *   schemas:
 *     ProfessorInput:
 *       type: object
 *       required:
 *         - full_name
 *         - email
 *         - senha
 *         - data_nascimento
 *       properties:
 *         full_name:
 *           type: string
 *           description: Nome completo do professor.
 *           example: Ana Santos
 *         email:
 *           type: string
 *           format: email
 *           description: Email único do professor.
 *           example: ana.santos@escola.com
 *         senha:
 *           type: string
 *           description: Senha do professor. Será hasheada.
 *           format: password
 *         telefone:
 *           type: string
 *           description: Telefone do professor (opcional).
 *           example: "11987654321"
 *         data_nascimento:
 *           type: string
 *           format: date
 *           description: Data de nascimento do professor (formato AAAA-MM-DD). **Professor deve ser maior de 18 anos.**
 *           example: 1985-05-15
 *         turma_id_principal:
 *           type: string
 *           description: ID da turma principal que o professor será associado (opcional).
 *           example: 60c72b4f9f1b2c001c8e4d2b
 *
 *     ProfessorOutput:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do professor.
 *           example: P0001
 *         full_name:
 *           type: string
 *         email:
 *           type: string
 *         telefone:
 *           type: string
 *         data_nascimento:
 *           type: string
 *           format: date
 *         idade:
 *           type: integer
 *           description: Idade calculada.
 *         turma_id_principal:
 *           type: string
 *           description: ID da turma principal.
 *         turma_associada:
 *           type: string
 *           description: Nome da turma principal (retornado após criação).
 *           example: Turma A - Manhã
 *
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensagem de erro.
 *           example: Professor deve ser maior de idade.
 */

/**
 * @swagger
 * /professor:
 *   post:
 *     summary: Cria um novo professor. (Admin Required)
 *     tags: [Professor]
 *     description: Endpoint para criar um novo registro de professor. Requer nome, email, senha e data de nascimento. O professor deve ter 18 anos ou mais.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfessorInput'
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
 *                   example: P0001
 *                 message:
 *                   type: string
 *                   example: Professor criado com sucesso
 *                 turma_associada:
 *                   type: string
 *                   example: Turma A - Manhã
 *       400:
 *         description: Requisição inválida (campos obrigatórios faltando, email inválido, menor de idade, email já existe).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Proibido.
 *       404:
 *         description: Turma principal com ID fornecido não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/', authMiddleware, verificarAdmin, createProfessor);

/**
 * @swagger
 * /professor:
 *   get:
 *     summary: Retorna a lista de todos os professores. (Admin Required)
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
 *                 $ref: '#/components/schemas/ProfessorOutput'
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
 *           description: ID do professor.
 *     responses:
 *       200:
 *         description: Professor encontrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfessorOutput'
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
 *     description: O usuário deve ser o próprio professor ou um administrador. Todos os campos são opcionais na atualização.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID do professor a ser atualizado.
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
 *                 format: email
 *               senha:
 *                 type: string
 *                 format: password
 *               telefone:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *               turma_id_principal:
 *                 type: string
 *     responses:
 *       200:
 *         description: Professor atualizado com sucesso.
 *       400:
 *         description: Requisição inválida (e.g., email inválido/duplicado, menor de idade).
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Proibido.
 *       404:
 *         description: Professor ou Turma não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.put('/:id', authMiddleware, verificarProprioUsuario('professor'), updateProfessor);

/**
 * @swagger
 * /professor/{id}:
 *   delete:
 *     summary: Deleta um professor pelo ID. (Admin Required)
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
 *           description: ID do professor a ser deletado.
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