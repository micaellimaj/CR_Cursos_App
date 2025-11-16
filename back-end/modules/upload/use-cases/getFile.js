const uploadService = require("../../services/uploadService");

module.exports = (req, res) => {
  try {
    const file = uploadService.getFile(req.params.fileName);
    if (!file) return res.status(404).json({ error: "Arquivo não encontrado" });

    res.download(file.path, file.name);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar o arquivo" });
  }
};
