const createAtividade = require('./use-cases/createAtividade');
const updateAtividade = require('./use-cases/updateAtividade');
const deleteAtividade = require('./use-cases/deleteAtividade');
const getAtividadeById = require('./use-cases/getAtividadeById');
const getAllAtividadesByDisciplina = require('./use-cases/getAllAtividadesByDisciplina');

async function criarAtividadeController(req, res) {
  try {
    const result = await createAtividade(req.body, req.file);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ 
      message: error.message || "Erro interno ao criar atividade." 
    });
  }
}

async function atualizarAtividadeController(req, res) {
  try {
    const { id } = req.params;
    const result = await updateAtividade(id, req.body, req.file);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ 
      message: error.message || "Erro interno ao atualizar atividade." 
    });
  }
}

async function removerAtividadeController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteAtividade(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ 
      message: error.message || "Erro interno ao remover atividade." 
    });
  }
}

async function getAtividadeByIdController(req, res) {
  try {
    const { id } = req.params;
    const result = await getAtividadeById(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ 
      message: error.message || "Atividade não encontrada." 
    });
  }
}

async function listarAtividadesPorDisciplinaController(req, res) {
  try {
    const { disciplinaId } = req.params;
    const result = await getAllAtividadesByDisciplina(disciplinaId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.status || 500).json({ 
      message: error.message || "Erro ao listar atividades." 
    });
  }
}

module.exports = {
  criarAtividadeController,
  atualizarAtividadeController,
  removerAtividadeController,
  getAtividadeByIdController,
  listarAtividadesPorDisciplinaController,
};