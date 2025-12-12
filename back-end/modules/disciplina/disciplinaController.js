const disciplinaService = require("./disciplinaService");

// Criar
async function criarDisciplinaController(req, res) {
  try {
    const result = await disciplinaService.criarDisciplina(req.body);
    return res.status(result.success ? 201 : 400).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
}

// Atualizar
async function atualizarDisciplinaController(req, res) {
  try {
    const { id } = req.params;
    const result = await disciplinaService.atualizarDisciplina(id, req.body);
    return res.status(result.success ? 200 : 400).json(result);
  } catch {
    return res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
}

// Remover
async function removerDisciplinaController(req, res) {
  try {
    const { id } = req.params;
    const result = await disciplinaService.removerDisciplina(id);
    return res.status(result.success ? 200 : 404).json(result);
  } catch {
    return res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
}

// Buscar por ID
async function getDisciplinaByIdController(req, res) {
  try {
    const { id } = req.params;
    const result = await disciplinaService.buscarDisciplinaPorId(id);
    return res.status(result.success ? 200 : 404).json(result);
  } catch {
    return res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
}

// Listar
async function listarDisciplinasController(req, res) {
  try {
    const result = await disciplinaService.listarDisciplinas();
    return res.status(200).json(result);
  } catch {
    return res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
}

// Associar turma
async function associarTurmaController(req, res) {
  try {
    const result = await disciplinaService.associarTurma(req.body);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error("Erro associarTurma:", error); // <-- ADICIONE ISTO
    return res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
}


module.exports = {
  criarDisciplinaController,
  atualizarDisciplinaController,
  removerDisciplinaController,
  getDisciplinaByIdController,
  listarDisciplinasController,
  associarTurmaController,
};
