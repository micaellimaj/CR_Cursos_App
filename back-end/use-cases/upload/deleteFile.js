const uploadService = require("../../services/uploadService");

module.exports = (req, res) => {
  try {
    const success = uploadService.deleteFile(req.params.fileName);
    if (!success) {
      return res.status(404).json({ error: "Arquivo não encontrado" });
    }

    return res.status(200).json({ message: "Arquivo deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar o arquivo" });
  }
};
