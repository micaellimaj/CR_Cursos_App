const { db } = require('../../shared/config/firebase'); 
const ENTIDADE = 'disciplinas';

async function create(id, dados) {
  await db.ref(`${ENTIDADE}/${id}`).set({
    ...dados,
    created_at: new Date().toISOString()
  });
  return id;
}

async function findById(id) {
  const snapshot = await db.ref(`${ENTIDADE}/${id}`).once('value');
  return snapshot.exists() ? { id, ...snapshot.val() } : null;
}

async function findAll() {
  const snapshot = await db.ref(ENTIDADE).once('value');
  const data = snapshot.val() || {};
  return Object.entries(data).map(([id, values]) => ({ id, ...values }));
}

async function update(id, novosDados) {
  const ref = db.ref(`${ENTIDADE}/${id}`);
  await ref.update({
    ...novosDados,
    updated_at: new Date().toISOString()
  });
  return true;
}

async function remove(id) {
  await db.ref(`${ENTIDADE}/${id}`).remove();
  return true;
}

module.exports = {
  create,
  findById,
  findAll,
  update,
  remove
};