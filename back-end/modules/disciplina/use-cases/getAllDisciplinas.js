const { db } = require("../../../shared/config/firebase");

async function getAllDisciplinas() {
  const disciplinasRef = db.ref("disciplinas");
  const snapshot = await disciplinasRef.get();

  if (!snapshot.exists()) {
    return { success: true, data: [] };
  }

  const data = Object.values(snapshot.val());

  return {
    success: true,
    data,
  };
}

module.exports = { getAllDisciplinas };
