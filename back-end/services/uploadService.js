const { bucket, db } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const salvarArquivo = async (arquivo, professorId) => {
  const extensao = path.extname(arquivo.originalname).toLowerCase();
  const nomeArquivo = `${uuidv4()}${extensao}`;
  const arquivoBucket = bucket.file(`uploads/${professorId}/${nomeArquivo}`);

  const stream = arquivoBucket.createWriteStream({
    metadata: {
      contentType: arquivo.mimetype
    }
  });

  return new Promise((resolve, reject) => {
    stream.on('error', (err) => reject(err));

    stream.on('finish', async () => {
      const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(arquivoBucket.name)}?alt=media`;

      const dados = {
        nome: arquivo.originalname,
        tipo: extensao,
        url,
        dataEnvio: new Date().toISOString()
      };

      const novoUploadRef = db.ref(`uploads/${professorId}`).push();
      await novoUploadRef.set(dados);

      resolve({ id: novoUploadRef.key, ...dados });
    });

    stream.end(arquivo.buffer);
  });
};

module.exports = { salvarArquivo };
