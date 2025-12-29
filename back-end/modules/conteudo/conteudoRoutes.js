const express = require("express");
const router = express.Router();
const upload = require("../../shared/middlewares/uploadMiddleware");

const {
  criarConteudoController,
  atualizarConteudoController,
  removerConteudoController,
  getConteudoByIdController,
  listarConteudosPorDisciplinaController,
} = require("./conteudoController");

/**
 * @swagger
 * tags:
 *   name: Conteúdos
 *   description: Gerenciamento de materiais das disciplinas (Textos, Arquivos, Vídeos, Links)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Conteudo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "CONT-X1Y2Z3"
 *         disciplinaId:
 *           type: string
 *           example: "DIS-A1B2C3"
 *         titulo:
 *           type: string
 *           example: "Aula 01 - Introdução ao Cálculo"
 *         descricao:
 *           type: string
 *           example: "Material de apoio para a primeira semana."
 *         tipo:
 *           type: string
 *           enum: [texto, arquivo, video, link]
 *           example: "arquivo"
 *         valor:
 *           type: string
 *           description: "Conteúdo em texto ou corpo da mensagem (obrigatório se tipo for 'texto')"
 *         url:
 *           type: string
 *           description: "URL externa ou link gerado pelo Firebase Storage"
 *         fileName:
 *           type: string
 *           example: "aula_apoio.pdf"
 */

/**
 * @swagger
 * /conteudos:
 *   post:
 *     summary: Criar um novo conteúdo (Texto, Arquivo, Vídeo ou Link)
 *     description: |
 *       Este endpoint é versátil. Dependendo do **tipo**, você deve preencher campos diferentes:
 *       - **tipo 'texto'**: Preencha o campo `valor` com o texto desejado.
 *       - **tipo 'arquivo'**: Utilize o campo `arquivo` para fazer upload de PDFs ou Slides.
 *       - **tipo 'video' ou 'link'**: Preencha o campo `url` com o link externo.
 *     tags:
 *       - Conteúdos
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - disciplinaId
 *               - titulo
 *               - tipo
 *             properties:
 *               disciplinaId:
 *                 type: string
 *                 description: ID da disciplina vinculada
 *               titulo:
 *                 type: string
 *                 description: Nome do material
 *               tipo:
 *                 type: string
 *                 enum: [texto, arquivo, video, link]
 *                 description: Define como o conteúdo será tratado
 *               descricao:
 *                 type: string
 *                 description: Breve resumo do conteúdo
 *               valor:
 *                 type: string
 *                 description: Texto da aula (Obrigatório para tipo 'texto')
 *               url:
 *                 type: string
 *                 description: Link externo (Obrigatório para tipo 'video' ou 'link')
 *               arquivo:
 *                 type: string
 *                 format: binary
 *                 description: O arquivo físico (Obrigatório para tipo 'arquivo')
 *     responses:
 *       201:
 *         description: Conteúdo criado com sucesso.
 *       400:
 *         description: Erro de validação nos campos enviados.
 *       500:
 *         description: Erro interno no servidor ou falha no Firebase.
 */
router.post("/", upload.single("arquivo"), criarConteudoController);


/**
 * @swagger
 * /conteudos/disciplina/{disciplinaId}:
 *   get:
 *     summary: Listar todos os conteúdos de uma disciplina
 *     tags: [Conteúdos]
 *     parameters:
 *       - in: path
 *         name: disciplinaId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de conteúdos.
 */
router.get("/disciplina/:disciplinaId", listarConteudosPorDisciplinaController);

/**
 * @swagger
 * /conteudos/{id}:
 *   get:
 *     summary: Buscar conteúdo por ID
 *     tags: [Conteúdos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do conteúdo.
 *       404:
 *         description: Conteúdo não encontrado.
 */
router.get("/:id", getConteudoByIdController);

/**
 * @swagger
 * /conteudos/{id}:
 *   put:
 *     summary: Atualizar metadados de um conteúdo
 *     tags: [Conteúdos]
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
 *             $ref: '#/components/schemas/Conteudo'
 *     responses:
 *       200:
 *         description: Conteúdo atualizado.
 */
router.put("/:id", atualizarConteudoController);

/**
 * @swagger
 * /conteudos/{id}:
 *   delete:
 *     summary: Remover um conteúdo e seu arquivo físico
 *     tags: [Conteúdos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Conteúdo removido.
 */
router.delete("/:id", removerConteudoController);

module.exports = router;