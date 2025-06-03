const uploadService = require("../services/uploadService");

const uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }

    const result = uploadService.saveFile(req.file);
    return res.status(200).json({ message: "Arquivo salvo com sucesso!", file: result });

  } catch (error) {
    console.error("Erro ao salvar o arquivo:", error);
    return res.status(500).json({ error: "Erro interno ao salvar o arquivo" });
  }
};

const listFiles = (req, res) => {
  try {
    const files = uploadService.getAllFiles();
    return res.status(200).json({ files });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar os arquivos" });
  }
};

const getFile = (req, res) => {
  try {
    const file = uploadService.getFile(req.params.fileName);
    if (!file) return res.status(404).json({ error: "Arquivo não encontrado" });

    res.download(file.path, file.name);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar o arquivo" });
  }
};

const updateFile = (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Nenhum arquivo enviado" });

    const result = uploadService.updateFile(req.params.fileName, req.file);
    return res.status(200).json({ message: "Arquivo atualizado com sucesso", file: result });

  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar o arquivo" });
  }
};

const deleteFile = (req, res) => {
  try {
    const success = uploadService.deleteFile(req.params.fileName);
    if (!success) return res.status(404).json({ error: "Arquivo não encontrado" });

    return res.status(200).json({ message: "Arquivo deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar o arquivo" });
  }
};

module.exports = {
  uploadFile,
  listFiles,
  getFile,
  updateFile,
  deleteFile,
};
