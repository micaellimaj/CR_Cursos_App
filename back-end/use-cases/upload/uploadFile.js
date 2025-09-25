const uploadService = require("../../services/uploadService");

module.exports = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }

    const result = uploadService.saveFile(req.file);
    return res.status(200).json({
      message: "Arquivo salvo com sucesso!",
      file: result
    });
  } catch (error) {
    console.error("Erro ao salvar o arquivo:", error);
    return res.status(500).json({ error: "Erro interno ao salvar o arquivo" });
  }
};
