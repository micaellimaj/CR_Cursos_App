const { db } = require("../../../shared/config/firebase");

async function getDisciplinaById(id) {
  if (!id) {
    return { success: false, message: "ID não informado." };
  }

  const disciplinaRef = db.ref(`disciplinas/${id}`);
  const snapshot = await disciplinaRef.get();

  if (!snapshot.exists()) {
    return { success: false, message: "Disciplina não encontrada." };
  }

  return {
    success: true,
    data: snapshot.val(),
  };
}

module.exports = { getDisciplinaById };
