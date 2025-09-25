const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Autenticação
 *     description: Rotas de login e logout (alunos, professores e administradores)
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login de um usuário (aluno, professor ou admin)
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário.
 *               senha:
 *                 type: string
 *                 description: Senha do usuário.
 *     responses:
 *       200:
 *         description: Login bem-sucedido. Retorna o token e os dados do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 tipo:
 *                   type: string
 *                   description: "aluno, professor ou admin"
 *                 id:
 *                   type: string
 *                   description: ID do usuário (ou admin)
 *                 nome:
 *                   type: string
 *                   description: Nome completo do usuário
 *       201:
 *         description: Admin criado e logado pela primeira vez (usando credenciais do .env).
 *       401:
 *         description: Credenciais inválidas ou senha incorreta.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Realiza o logout do usuário
 *     tags: [Autenticação]
 *     description: Invalida o token JWT. Requer que o usuário esteja autenticado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout bem-sucedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout realizado com sucesso."
 *       401:
 *         description: Não autorizado (token não fornecido ou inválido).
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/logout', authMiddleware, logout);

module.exports = router;
