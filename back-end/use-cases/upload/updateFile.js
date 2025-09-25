const uploadService = require("../../services/uploadService");

module.exports = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }

    const result = uploadService.updateFile(req.params.fileName, req.file);
    return res.status(200).json({
      message: "Arquivo atualizado com sucesso",
      file: result
    });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar o arquivo" });
  }
};
