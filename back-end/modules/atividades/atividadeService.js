const { db, bucket } = require('../../shared/config/firebase'); 
const ENTIDADE = 'atividades';

async function create(id, dados) {
  await db.ref(`${ENTIDADE}/${id}`).set({
    ...dados,
    created_at: new Date().toISOString()
  });
  return id;
}

async function getById(id) {
  const snapshot = await db.ref(`${ENTIDADE}/${id}`).once('value');
  return snapshot.exists() ? { id, ...snapshot.val() } : null;
}

async function getByDisciplina(disciplinaId) {
  const snapshot = await db.ref(ENTIDADE)
    .orderByChild('disciplinaId')
    .equalTo(disciplinaId)
    .once('value');
  return snapshot.val();
}

async function update(id, novosDados) {
  const ref = db.ref(`${ENTIDADE}/${id}`);
  await ref.update({
    ...novosDados,
    updated_at: new Date().toISOString()
  });
  return true;
}

async function remover(id) {
  await db.ref(`${ENTIDADE}/${id}`).remove();
  return true;
}

async function uploadToStorage(file, disciplinaId) {
  const fileName = `disciplinas/${disciplinaId}/atividades/${Date.now()}_${file.originalname}`;
  const fileUpload = bucket.file(fileName);

  await fileUpload.save(file.buffer, {
    metadata: { contentType: file.mimetype },
  });

  await fileUpload.makePublic();
  return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
}

async function deleteFromStorage(fileUrl) {
  try {
    const baseUrl = `https://storage.googleapis.com/${bucket.name}/`;
    const filePath = fileUrl.replace(baseUrl, "");
    
    await bucket.file(filePath).delete();
    return true;
  } catch (error) {
    console.error("Erro ao remover arquivo do Storage:", error);
    return false;
  }
}

module.exports = {
  create,
  getById,
  getAllByDisciplina: getByDisciplina,
  update,
  uploadToStorage,
  deleteFromStorage,
  delete: remover 
};