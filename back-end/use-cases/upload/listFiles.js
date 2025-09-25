const uploadService = require("../../services/uploadService");

module.exports = (req, res) => {
  try {
    const files = uploadService.getAllFiles();
    return res.status(200).json({ files });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar os arquivos" });
  }
};
