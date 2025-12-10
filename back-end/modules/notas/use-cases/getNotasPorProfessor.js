const { db } = require("../../../shared/config/firebase");

module.exports.getNotasPorProfessor = async (professorId) => {
  const snap = await db.ref("notas")
    .orderByChild("professorId")
    .equalTo(professorId)
    .once("value");

  const data = snap.val() || {};
  return Object.entries(data).map(([id, v]) => ({ id, ...v }));
};
