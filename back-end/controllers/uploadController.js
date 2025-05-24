const uploadService = require('../services/uploadService');

const uploadArquivo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ erro: 'Nenhum arquivo enviado' });
    }

    const professorId = req.user.id;
    const resultado = await uploadService.salvarArquivo(req.file, professorId);

    res.status(201).json({ mensagem: 'Upload realizado com sucesso', dados: resultado });
  } catch (error) {
    console.error('Erro no uploadController:', error);
    res.status(500).json({ erro: 'Erro ao realizar upload' });
  }
};

module.exports = { uploadArquivo };
