const Conteudo = require('../models/conteudoModel');
const { validarDadosConteudo } = require('../types/conteudoSchema');
const conteudoService = require('../conteudoService');
const gerarIdConteudo = require('../utils/gerarIdConteudo');

module.exports = async (dados, arquivo) => {
  validarDadosConteudo(dados);

  let urlFinal = dados.url || null;
  let fileName = null;
  let mimeType = null;

  if (arquivo) {
    urlFinal = await conteudoService.uploadToStorage(arquivo, dados.disciplinaId);
    fileName = arquivo.originalname;
    mimeType = arquivo.mimetype;
  }

  const novoConteudo = new Conteudo({ 
    ...dados, 
    id: gerarIdConteudo(),
    url: urlFinal,
    fileName: fileName,
    mimeType: mimeType,
    created_at: new Date().toISOString() 
  });

  await conteudoService.create(novoConteudo.id, novoConteudo.toJSON());

  return { 
    id: novoConteudo.id, 
    message: "Conteúdo criado com sucesso!",
    data: novoConteudo.toJSON()
  };
};