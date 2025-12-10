const { db } = require("../../../shared/config/firebase");

module.exports.getNotasPorDisciplina = async (disciplinaId) => {
  const snap = await db.ref("notas")
    .orderByChild("disciplinaId")
    .equalTo(disciplinaId)
    .once("value");

  const data = snap.val() || {};
  return Object.entries(data).map(([id, v]) => ({ id, ...v }));
};
