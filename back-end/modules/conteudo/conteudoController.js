const createConteudo = require('./use-cases/createConteudo');
const updateConteudo = require('./use-cases/updateConteudo');
const deleteConteudo = require('./use-cases/deleteConteudo');
const getConteudoById = require('./use-cases/getConteudoById');
const getConteudosByDisciplina = require('./use-cases/getConteudosByDisciplina');

async function criarConteudoController(req, res) {
  try {
    const result = await createConteudo(req.body, req.file);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ 
      message: error.message || "Erro interno ao criar conteúdo." 
    });
  }
}

async function atualizarConteudoController(req, res) {
  try {
    const { id } = req.params;
    const result = await updateConteudo(id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ 
      message: error.message || "Erro interno ao atualizar conteúdo." 
    });
  }
}

async function removerConteudoController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteConteudo(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ 
      message: error.message || "Erro interno ao remover conteúdo." 
    });
  }
}

async function getConteudoByIdController(req, res) {
  try {
    const { id } = req.params;
    const result = await getConteudoById(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ 
      message: error.message || "Conteúdo não encontrado." 
    });
  }
}

async function listarConteudosPorDisciplinaController(req, res) {
  try {
    const { disciplinaId } = req.params;
    const result = await getConteudosByDisciplina(disciplinaId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ 
      message: error.message || "Erro ao listar conteúdos." 
    });
  }
}

module.exports = {
  criarConteudoController,
  atualizarConteudoController,
  removerConteudoController,
  getConteudoByIdController,
  listarConteudosPorDisciplinaController,
};