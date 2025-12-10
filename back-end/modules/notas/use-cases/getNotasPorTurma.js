const { db } = require("../../../shared/config/firebase");

module.exports.getNotasPorTurma = async (turmaId) => {
  const snap = await db.ref("notas")
    .orderByChild("turmaId")
    .equalTo(turmaId)
    .once("value");

  const data = snap.val() || {};
  return Object.entries(data).map(([id, v]) => ({ id, ...v }));
};
