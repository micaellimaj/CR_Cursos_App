const { db } = require('../../../shared/config/firebase');

module.exports = async (frequenciaId) => {
  if (!frequenciaId) {
    throw { status: 400, message: 'ID da frequência é obrigatório.' };
  }

  const freqRef = db.ref(`frequencias/${frequenciaId}`);
  const snapshot = await freqRef.once('value');

  if (!snapshot.exists()) {
    throw { status: 404, message: 'Registro não encontrado.' };
  }

  await freqRef.remove();

  return { message: 'Registro de frequência excluído com sucesso.' };
};