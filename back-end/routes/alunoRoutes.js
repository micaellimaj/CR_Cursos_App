const express = require('express');
const router = express.Router();
const {
  createAluno,
  getAllAlunos,
  getAlunoById,
  updateAluno,
  deleteAluno
} = require('../controllers/alunoController');

const authMiddleware = require('../middlewares/authMiddleware');
const verificarAdmin = require('../middlewares/verificarAdmin');
const verificarProprioUsuario = require('../middlewares/verificarProprioUsuario');

/**
 * @swagger
 * tags:
 *   - name: Aluno
 *     description: Endpoints para gerenciamento de alunos
 *
 * components:
 *   schemas:
 *     Aluno:
 *       type: object
 *       required:
 *         - full_name
 *         - email
 *         - senha
 *         - data_nascimento
 *       properties:
 *         id:
 *           type: string
 *           description: ID do aluno
 *         full_name:
 *           type: string
 *           description: Nome completo do aluno
 *         email:
 *           type: string
 *           format: email
 *           description: Email do aluno
 *         senha:
 *           type: string
 *           description: Senha do aluno
 *         confirmarSenha:
 *           type: string
 *           description: Confirmação da senha
 *         nome_responsavel:
 *           type: string
 *           description: Nome do responsável, obrigatório para menores de 18 anos
 *         email_responsavel:
 *           type: string
 *           format: email
 *           description: Email do responsável
 *         telefone_responsavel:
 *           type: string
 *           description: Telefone do responsável
 *         telefone:
 *           type: string
 *           description: Telefone do aluno
 *         data_nascimento:
 *           type: string
 *           format: date
 *           description: Data de nascimento do aluno (AAAA-MM-DD)
 */

/**
 * @swagger
 * /aluno:
 *   post:
 *     summary: Cria um novo aluno
 *     tags: [Aluno]
 *     description: Endpoint para criar um novo registro de aluno. Requer permissões de administrador.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido (não é um administrador)
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, verificarAdmin, createAluno);

/**
 * @swagger
 * /aluno:
 *   get:
 *     summary: Lista todos os alunos
 *     tags: [Aluno]
 *     description: Endpoint para obter todos os alunos. Requer permissões de administrador.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de alunos obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aluno'
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, verificarAdmin, getAllAlunos);

/**
 * @swagger
 * /aluno/{id}:
 *   get:
 *     summary: Retorna um aluno pelo ID
 *     tags: [Aluno]
 *     description: Endpoint para obter um aluno específico. O usuário deve ser o próprio aluno ou um administrador.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Aluno encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido (tentativa de acessar dados de outro usuário)
 *       404:
 *         description: Aluno não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, verificarProprioUsuario('aluno'), getAlunoById);

/**
 * @swagger
 * /aluno/{id}:
 *   put:
 *     summary: Atualiza um aluno pelo ID
 *     tags: [Aluno]
 *     description: Endpoint para atualizar os dados de um aluno. O usuário deve ser o próprio aluno ou um administrador.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do aluno a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido
 *       404:
 *         description: Aluno não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, verificarProprioUsuario('aluno'), updateAluno);

/**
 * @swagger
 * /aluno/{id}:
 *   delete:
 *     summary: Deleta um aluno pelo ID
 *     tags: [Aluno]
 *     description: Endpoint para deletar um aluno. Requer permissões de administrador.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do aluno a ser deletado
 *     responses:
 *       200:
 *         description: Aluno removido com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido
 *       404:
 *         description: Aluno não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authMiddleware, verificarProprioUsuario('aluno'), deleteAluno);

module.exports = router;
