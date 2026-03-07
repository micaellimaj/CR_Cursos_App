const express = require('express');
const router = express.Router();
const { getMe, updateMe } = require('./adminController');
const authMiddleware = require('../../shared/middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Administrador
 *     description: Gerenciamento do perfil do administrador logado
 */

/**
 * @swagger
 * /administradores/me:
 *   get:
 *     summary: Retorna os dados do administrador autenticado
 *     tags: [Administrador]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do perfil retornados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 full_name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 tipo:
 *                   type: string
 *                   example: "admin"
 *       401:
 *         description: Token não fornecido ou inválido.
 *       404:
 *         description: Administrador não encontrado no banco de dados.
 */
router.get('/me', authMiddleware, getMe);

/**
 * @swagger
 * /administradores/update:
 *   put:
 *     summary: Atualiza os dados do administrador autenticado
 *     tags: [Administrador]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 description: Novo nome completo
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Novo email
 *               senha:
 *                 type: string
 *                 description: Nova senha (mínimo 6 caracteres)
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Perfil atualizado com sucesso"
 *       400:
 *         description: Erro de validação nos campos enviados.
 *       401:
 *         description: Não autorizado.
 *       500:
 *         description: Erro interno no servidor.
 */
router.put('/update', authMiddleware, updateMe);

module.exports = router;