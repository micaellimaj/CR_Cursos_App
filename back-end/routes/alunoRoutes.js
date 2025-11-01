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
 *     AlunoInput:
 *       type: object
 *       required:
 *         - full_name
 *         - email
 *         - senha
 *         - data_nascimento
 *         - turma_id
 *       properties:
 *         full_name:
 *           type: string
 *           description: Nome completo do aluno
 *           example: Maria da Silva
 *         email:
 *           type: string
 *           format: email
 *           description: Email do aluno. Deve ser único.
 *           example: maria@exemplo.com
 *         senha:
 *           type: string
 *           description: Senha do aluno. Será hasheada no backend.
 *           format: password
 *         confirmarSenha:
 *           type: string
 *           description: Confirmação da senha (usado para validação)
 *           format: password
 *         turma_id:
 *           type: string
 *           description: ID da turma na qual o aluno será matriculado.
 *           example: 60c72b4f9f1b2c001c8e4d2b
 *         data_nascimento:
 *           type: string
 *           format: date
 *           description: Data de nascimento do aluno (formato recomendado AAAA-MM-DD). Usado para calcular a idade.
 *           example: 2008-01-20
 *         nome_responsavel:
 *           type: string
 *           description: Nome do responsável. **Obrigatório se o aluno for menor de 18 anos.**
 *           example: João Responsável
 *         email_responsavel:
 *           type: string
 *           format: email
 *           description: Email do responsável. **Obrigatório se o aluno for menor de 18 anos.**
 *           example: joao@responsavel.com
 *         telefone_responsavel:
 *           type: string
 *           description: Telefone do responsável. **Obrigatório se o aluno for menor de 18 anos.**
 *           example: "11999998888"
 *         telefone:
 *           type: string
 *           description: Telefone de contato do aluno (opcional).
 *           example: "11977776666"
 *
 *     AlunoOutput:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do aluno.
 *           example: A0001
 *         full_name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         data_nascimento:
 *           type: string
 *           format: date
 *         idade:
 *           type: integer
 *           description: Idade calculada do aluno.
 *         turma_id:
 *           type: string
 *         nome_responsavel:
 *           type: string
 *         email_responsavel:
 *           type: string
 *         telefone_responsavel:
 *           type: string
 *         telefone:
 *           type: string
 *
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensagem de erro.
 *           example: Campos obrigatórios faltando
 */

/**
 * @swagger
 * /aluno:
 *   post:
 *     summary: Cria um novo aluno. (Admin Required)
 *     tags: [Aluno]
 *     description: Endpoint para criar um novo registro de aluno. Requer permissões de administrador.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlunoInput'
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso e matriculado na turma.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: A0001
 *                 message:
 *                   type: string
 *                   example: Aluno criado com sucesso
 *                 turma_id:
 *                   type: string
 *                   example: 60c72b4f9f1b2c001c8e4d2b
 *                 curso:
 *                   type: string
 *                   example: Engenharia de Software
 *       400:
 *         description: Requisição inválida devido a validações de negócio (campos faltando, email inválido, menor sem responsável, email duplicado, data de nascimento inválida).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido (não é um administrador)
 *       404:
 *         description: Turma com o ID fornecido não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, verificarAdmin, createAluno);

/**
 * @swagger
 * /aluno:
 *   get:
 *     summary: Lista todos os alunos. (Admin Required)
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
 *                 $ref: '#/components/schemas/AlunoOutput'
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
 *           description: ID do aluno
 *     responses:
 *       200:
 *         description: Aluno encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AlunoOutput'
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
 *     description: Endpoint para atualizar os dados de um aluno. O usuário deve ser o próprio aluno ou um administrador. Os campos são opcionais, exceto a lógica de responsável para menores que pode ser revalidada.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: ID do aluno a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: # Campos todos opcionais na atualização
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *                 format: password
 *               confirmarSenha:
 *                 type: string
 *                 format: password
 *               nome_responsavel:
 *                 type: string
 *               email_responsavel:
 *                 type: string
 *                 format: email
 *               telefone_responsavel:
 *                 type: string
 *               telefone:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *               turma_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso
 *       400:
 *         description: Requisição inválida (e.g. email duplicado, menor sem responsável)
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido
 *       404:
 *         description: Aluno ou Turma não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, verificarProprioUsuario('aluno'), updateAluno);

/**
 * @swagger
 * /aluno/{id}:
 *   delete:
 *     summary: Deleta um aluno pelo ID. (Admin Required)
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
 *           description: ID do aluno a ser deletado
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
router.delete('/:id', authMiddleware, verificarAdmin, deleteAluno);

module.exports = router;