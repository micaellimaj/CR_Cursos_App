const { db } = require('../../../shared/config/firebase');
const Frequencia = require('../models/frequenciaModel');

module.exports = async (frequenciaId, novosDados) => {
  const freqRef = db.ref(`frequencias/${frequenciaId}`);
  const snapshot = await freqRef.once('value');

  if (!snapshot.exists()) throw { status: 404, message: 'Registro não encontrado.' };

  const dadosAntigos = snapshot.val();
  
  const frequenciaAtualizada = new Frequencia({
    ...dadosAntigos,
    ...novosDados,
    updated_at: new Date().toISOString()
  });

  await freqRef.update(frequenciaAtualizada.toJSON());

  return { 
    message: 'Frequência atualizada com sucesso.',
    data: frequenciaAtualizada.toJSON() 
  };
};